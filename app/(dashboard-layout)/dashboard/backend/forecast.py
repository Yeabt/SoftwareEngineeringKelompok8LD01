import pandas as pd
import numpy as np
from statsmodels.tsa.statespace.sarimax import SARIMAX

def run_forecast():
    data_path = "./data/pengeluaran_harian_2024_final.csv"
    df = pd.read_csv(data_path)
    df['date'] = pd.to_datetime(df['date'])

    # Monthly aggregation by category
    monthly_cat = df.groupby([df['date'].dt.to_period('M'), 'category'])['amount'].sum().reset_index()
    monthly_cat['date'] = monthly_cat['date'].dt.to_timestamp()
    monthly_cat = monthly_cat.rename(columns={'date': 'ds', 'amount': 'y'})

    categories = monthly_cat['category'].unique()
    forecast_results = {}

    for cat in categories:
        cat_data = monthly_cat[monthly_cat['category'] == cat].copy()
        cat_data.set_index('ds', inplace=True)

        # Fit SARIMA model (static order for simplicity)
        order = (1, 1, 1)
        seasonal_order = (1, 1, 1, 12)

        model = SARIMAX(cat_data['y'], order=order, seasonal_order=seasonal_order, enforce_stationarity=False, enforce_invertibility=False)
        results = model.fit(disp=False)

        forecast = results.forecast(steps=1)
        forecast_date = cat_data.index[-1] + pd.DateOffset(months=1)

        forecast_results[cat] = f"Rp. {int(forecast[0]):,}".replace(",", ".")

    return forecast_results
    