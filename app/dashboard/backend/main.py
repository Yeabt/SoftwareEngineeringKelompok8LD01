from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from statsmodels.tsa.statespace.sarimax import SARIMAX
from datetime import datetime
import traceback
import threading
import time
import pandas as pd

app = FastAPI()

# Allow frontend (e.g., Next.js) to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace "*" with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"message": "Welcome to the Forecast API"}
monthly_forecast = {}

def update_model_monthly():
    global monthly_forecast

    try:
        data_path = "./data/pengeluaran_harian_2024_final.csv"
        df = pd.read_csv(data_path)
        df['date'] = pd.to_datetime(df['date'])
        df = df.groupby([df['date'].dt.to_period('M'), 'category'])['amount'].sum().reset_index()
        df['date'] = df['date'].dt.to_timestamp()

        
        results = {}
        for cat in df['category'].unique():
            cat_data = df[df['category'] == cat].copy()
            cat_data.set_index('date', inplace=True)

            months_of_data = cat_data.index.to_period('M').nunique()

            if months_of_data >= 12:
                try:
                    model = SARIMAX(cat_data['amount'], order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
                    fitted = model.fit(disp=False)
                    forecast = fitted.forecast(steps=1)
                    forecast_value = forecast.iloc[0]
                    results[cat] = f"Rp. {int(round(forecast_value)):,}".replace(",", ".")
                except Exception as e:
                    print(f"SARIMA failed for {cat}: {e}")
                    results[cat] = "Forecasting error"
            elif months_of_data >= 1:
                from sklearn.linear_model import LinearRegression
                import numpy as np

                cat_data = df[df['category'] == cat].copy()
                cat_data.set_index('date', inplace=True)
                cat_data = cat_data.resample('M').sum()

                cat_data = cat_data.reset_index()
                cat_data['month_index'] = np.arange(len(cat_data))

                X = cat_data[['month_index']]
                y = cat_data['amount']
                model = LinearRegression().fit(X, y)

                next_month_index = len(cat_data)
                forecast_value = model.predict([[next_month_index]])[0]
                results[cat] = f"Rp. {int(round(forecast_value)):,}".replace(",", ".")

                print(f"Fallback regression model used for {cat} — using {months_of_data} months")

            else:
                results[cat] = "Insufficient data"

        monthly_forecast = results
        print("Monthly forecast updated:", monthly_forecast)

    except Exception as e:
        print("Forecast update failed:", e)
        traceback.print_exc()
        
def run_monthly_updater():
    update_model_monthly()  # initial run
    while True:
        now = datetime.now()
        if now.day == 1 and now.hour == 1:
            update_model_monthly()
            print("updated succesfully")
            time.sleep(86400)  # wait a day
        
        print("i am a sleep")    
        time.sleep(3600)

@app.get("/forecast")
def get_forecast():
    if not monthly_forecast:
        return {"message": "Forecast not yet generated."}
    return monthly_forecast

if __name__ == "__main__":
    import uvicorn
    threading.Thread(target=run_monthly_updater, daemon=True).start()
    uvicorn.run(app, host="127.0.0.1", port=8000)
# direction = 


#command to start = python main.py
