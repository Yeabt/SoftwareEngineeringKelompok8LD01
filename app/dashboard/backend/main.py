from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from statsmodels.tsa.statespace.sarimax import SARIMAX

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"message": "Welcome to the Forecast API"}

@app.get("/forecast")
def run_forecast():
    data_path = "./data/pengeluaran_harian_2024_final.csv"
    df = pd.read_csv(data_path)
    df['date'] = pd.to_datetime(df['date'])
    df = df.groupby([df['date'].dt.to_period('M'), 'category'])['amount'].sum().reset_index()
    df['date'] = df['date'].dt.to_timestamp()

    results = {}
    for cat in df['category'].unique():
        cat_data = df[df['category'] == cat].copy()
        cat_data.set_index('date', inplace=True)
        model = SARIMAX(cat_data['amount'], order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
        fitted = model.fit(disp=False)
        forecast = fitted.forecast(steps=1)
        forecast_date = cat_data.index[-1] + pd.DateOffset(months=1)
        forecast_value = forecast.iloc[0]
        results[cat] = f"Rp. {int(round(forecast_value)):,}".replace(",", ".")
    return results
