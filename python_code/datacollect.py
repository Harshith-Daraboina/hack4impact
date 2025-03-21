import pandas as pd
import requests
import time

# OpenWeather API Key
API_KEY = "c292a76aa27bd280ab4b44db7e5559ba"

# Load the Excel file (change the filename if needed)
FILE_PATH = "./6_April_2023_Daily_Report.xlsx"

# Read the Excel file (assumes data is in the first sheet)
df = pd.read_excel(FILE_PATH)

# Extract relevant columns (Modify if needed)
locations = df.iloc[:, 0].dropna().tolist()  # Assuming first column contains state names

# Hardcoded lat/lon for states (Modify if needed)
state_coordinates = {
    "Chandigarh": (30.7333, 76.7794),
    "Delhi": (28.7041, 77.1025),
    "Haryana": (29.0588, 76.0856),
    "Himachal Pradesh": (31.1048, 77.1734),
    "Jammu and Kashmir": (33.7782, 76.5762),
    "Ladakh": (34.1526, 77.5771),
    "Punjab": (31.1471, 75.3412),
    "Rajasthan": (27.0238, 74.2179),
    "Uttar Pradesh": (26.8467, 80.9462),
}

# Function to fetch weather data from OpenWeather API
def get_weather(lat, lon):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        if response.status_code == 200:
            return {
                "temperature": data["main"]["temp"],
                "humidity": data["main"]["humidity"],
                "pressure": data["main"]["pressure"],
                "wind_speed": data["wind"]["speed"],
                "precipitation": data.get("rain", {}).get("1h", 0) + data.get("snow", {}).get("1h", 0),
            }
        else:
            print(f"Error fetching data for {lat}, {lon}: {data}")
            return None
    except Exception as e:
        print("Request failed:", e)
        return None

# Power Prediction Model (Basic)
def calculate_power(temp, wind_speed, humidity, pressure, precipitation):
    solar_power = max(0, (temp * 5) - (humidity * 0.2) - (precipitation * 3))
    wind_power = max(0, (wind_speed ** 3) * 0.5 - (pressure * 0.01))
    
    return round(solar_power, 2), round(wind_power, 2)

# Collect data
weather_results = []
for state, coords in state_coordinates.items():
    print(f"Fetching weather data for {state}...")
    weather = get_weather(coords[0], coords[1])
    
    if weather:
        solar_power, wind_power = calculate_power(
            weather["temperature"], weather["wind_speed"], weather["humidity"], weather["pressure"], weather["precipitation"]
        )
        
        weather_results.append({
            "State": state,
            "Latitude": coords[0],
            "Longitude": coords[1],
            "Temperature (°C)": weather["temperature"],
            "Humidity (%)": weather["humidity"],
            "Pressure (hPa)": weather["pressure"],
            "Wind Speed (m/s)": weather["wind_speed"],
            "Precipitation (mm)": weather["precipitation"],
            "Solar Power Output (MW)": solar_power,
            "Wind Power Output (MW)": wind_power
        })
    
    time.sleep(1)  # To avoid rate limiting

# Convert results to DataFrame
output_df = pd.DataFrame(weather_results)

# Save as CSV
output_df.to_csv("weather_power_output.csv", index=False)
print("✅ Weather data and power predictions saved to weather_power_output.csv")
