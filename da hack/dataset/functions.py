import pandas as pd
import numpy as np
import pandas as pd
from textwrap import wrap
def inf(a):
    print('Shape of df:',a.shape)
    print('columns available:')
    return a.columns.tolist()
def ht(a):
    return a.head(),a.tail()
def rs(df):
    def print_in_columns(data_dict, columns=3, col_width=30):
        items = list(data_dict.items())
        rows = (len(items) + columns - 1) // columns
        lines = []

        for i in range(rows):
            line=""
            for j in range(columns):
                idx=i+j*rows
                if idx < len(items):
                    key, value = items[idx]
                    key_str = f"{key:<12}"
                    val_str = f"{value}"
                    line += f"{key_str}: {val_str:<{col_width - 15}}"
            print(line)

    for col in df.columns:
        print(f"\n{col}")
        print("-" * len(col))
        series = df[col]

        if pd.api.types.is_numeric_dtype(series):
            stats = {
                "Min.": round(series.min(), 2),
                "1st Qu.": round(series.quantile(0.25), 2),
                "Median": round(series.median(), 2),
                "Mean": round(series.mean(), 2),
                "3rd Qu.": round(series.quantile(0.75), 2),
                "Max.": round(series.max(), 2)
            }
            if series.isnull().sum() > 0:
                stats["NA's"] = series.isnull().sum()

            print_in_columns(stats, columns=3)

        elif pd.api.types.is_bool_dtype(series):
            stats = {
                "FALSE": (series == False).sum(),
                "TRUE": (series == True).sum()
            }
            if series.isnull().sum() > 0:
                stats["NA's"] = series.isnull().sum()
            print_in_columns(stats)

        elif pd.api.types.is_object_dtype(series) or pd.api.types.is_categorical_dtype(series):
            value_counts = series.value_counts()
            stats = {}
            top_n = 6
            for idx in value_counts.index[:top_n]:
                stats[str(idx)] = value_counts[idx]
            if len(value_counts) > top_n:
                stats["(Other)"] = value_counts[top_n:].sum()
            if series.isnull().sum() > 0:
                stats["NA's"] = series.isnull().sum()

            print_in_columns(stats, columns=3)
        else:
            print("Unsupported column type.")
def fuwmode(df,sqq):
    df = df.copy()
    for col in df.columns:
        if df[col].dtype == object or pd.api.types.is_categorical_dtype(df[col]):
            # Treat "Unknown" as missing
            df[col] = df[col].replace(sqq, pd.NA)
            if df[col].isna().sum() > 0:
                mode = df[col].mode(dropna=True)
                if not mode.empty:
                    df[col] = df[col].fillna(mode[0])
    return df
def fnwmean(df):
    df = df.copy()
    for col in df.columns:
        if pd.api.types.is_numeric_dtype(df[col]):
            if df[col].isna().sum() > 0:
                mean = df[col].mean()
                df[col] = df[col].fillna(mean)
    return df
def cd(df):
    df = df.copy()
    for col in df.columns:
        # Replace "Unknown" with NaN universally
        df[col] = df[col].replace("Unknown", pd.NA)

        # Try numeric conversion if possible
        try:
            df[col] = pd.to_numeric(df[col], errors='ignore')
        except:
            pass
        if pd.api.types.is_numeric_dtype(df[col]):
            df[col] = pd.to_numeric(df[col], errors='coerce')
            df[col] = df[col].fillna(df[col].mean())
        else:
            mode = df[col].mode(dropna=True)
            if not mode.empty:
                df[col] = df[col].fillna(mode[0])
    return df
def fuwmean(df):
    df = df.copy()
    for col in df.columns:
        # If the column is numeric or contains "Unknown" pretending to be numeric
        if df[col].dtype == object:
            try:
                # Replace "Unknown" with NaN
                df[col] = df[col].replace("Unknown", np.nan)
                # Try converting to numeric
                df[col] = pd.to_numeric(df[col], errors='coerce')
            except:
                continue

        if pd.api.types.is_numeric_dtype(df[col]):
            mean_val = df[col].mean()
            df[col] = df[col].fillna(mean_val)
    return df
