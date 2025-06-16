from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from statsmodels.tsa.statespace.sarimax import SARIMAX
from datetime import datetime
import traceback
import threading
import time
import pandas as pd
import numpy as np
from prophet import Prophet
from sklearn.linear_model import LinearRegression
from statsmodels.tsa.holtwinters import ExponentialSmoothing
import os
app = FastAPI()

# Allow frontend (e.g., Next.js) to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace "*" with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/trigger-update")
async def trigger_update():
    """Endpoint to manually trigger forecast update"""
    try:
        update_model_monthly()
        return {"status": "success", "message": "Forecast updated successfully", "data": monthly_forecast}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/")
def root():
    return {"message": "Welcome to the Forecast API"}
monthly_forecast = {}

def log_forecast_results(results):
    log_dir = "./logs"
    os.makedirs(log_dir, exist_ok=True)
    log_file = os.path.join(log_dir, "forecast_log.txt")

    with open(log_file, "a", encoding="utf-8") as f:
        f.write(f"\n=== Forecast log at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} ===\n")
        for cat in [
            "Food&Beverage",
            "Entertainment",
            "Health",
            "Transportation",
            "Utilities",
            "Others",
        ]:
            value = results.get(cat, "Insufficient data")
            f.write(f"{cat}: {value}\n")
        f.write("\n")


def update_model_monthly():
    global monthly_forecast
    
    try:
        data_path = "./data/pengeluaran_harian_2024_final.csv"
        df = pd.read_csv(data_path)
        df['date'] = pd.to_datetime(df['date'])
        monthly_cat = df.groupby([df['date'].dt.to_period('M'), 'category'])['amount'].sum().reset_index()
        monthly_cat['date'] = monthly_cat['date'].dt.to_timestamp()
        monthly_cat = monthly_cat.rename(columns={'date': 'ds', 'amount': 'y'})

        categories = monthly_cat['category'].unique()
        forecast_results = {}

        for cat in categories:
            cat_data = monthly_cat[monthly_cat['category'] == cat].copy()
            cat_data.set_index('ds', inplace=True)
            n_months = len(cat_data)
            if n_months < 12:
                try:
                    X = np.arange(len(cat_data)).reshape(-1, 1)  
                    y = cat_data['y'].values
                    model = LinearRegression().fit(X, y)
                    forecast = model.predict([[len(cat_data)]])[0]
                    forecast_results[cat] = f"Rp. {int(forecast):,}".replace(",", ".")
                except Exception as e:
                    forecast_results[cat] = f"Error: {str(e)}"
            else:
                forecasts = []
                order = (1, 1, 1)
                seasonal_order = (1, 1, 1, 12)

                try:
                    model = SARIMAX(cat_data['y'], order=order, seasonal_order=seasonal_order,
                                    enforce_stationarity=False, enforce_invertibility=False)
                    results = model.fit(disp=False)
                    forecast = results.forecast(steps=1)
                    forecasts.append(forecast.values[0])
                    
                    
                    try:
                        if n_months >= 24:
                            ets_model = ExponentialSmoothing(cat_data['y'],
                                                        seasonal='add',
                                                        seasonal_periods=12)
                        else:
                            ets_model = ExponentialSmoothing(cat_data['y'],
                                                        trend='add',
                                                        seasonal=None)
                        forecasts.append(ets_model.fit().forecast(1)[0])
                    except Exception as e:
                        print(f"ETS skipped for {cat}: {str(e)}")
                        
                        
                    #prophet
                    try:
                        # Prepare Prophet dataframe correctly
                        prophet_df = cat_data[['y']].reset_index()
                        prophet_df.columns = ['ds', 'y']  # Ensure only these two columns
                        
                        prophet_model = Prophet(seasonality_mode='additive')
                        prophet_model.fit(prophet_df)
                        future = prophet_model.make_future_dataframe(periods=1, freq='M')
                        prophet_forecast = prophet_model.predict(future)
                        forecasts.append(prophet_forecast['yhat'].iloc[-1])
                    except Exception as e:
                        print(f"Prophet skipped for {cat}: {str(e)}")
                    
                    # Average successful forecasts
                    if forecasts:
                        forecast_results[cat] = f"Rp. {int(np.mean(forecasts)):,}".replace(",", ".")
                    else:
                        forecast_results[cat] = "Error: All models failed"
                except Exception as e:
                    forecast_results[cat] = f"Error: {str(e)}"


        monthly_forecast = forecast_results
        log_forecast_results(forecast_results)
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