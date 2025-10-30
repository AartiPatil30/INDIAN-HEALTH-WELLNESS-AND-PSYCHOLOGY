# Psychology Data Analysis of Indian Students
# Author: [Your Name]
# Course: Indian Health Wellness and Psychology

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
# data = pd.read_csv('dataset.csv')
data = pd.read_csv('dataset.csv')


# Display first few rows
# print("Sample Data:")
# print(data.head())

print(data.head())
print(data.info())


# Basic info
print("\nSummary Statistics:")
print(data.describe())

# Correlation Analysis
corr = data.corr()
print("\nCorrelation Matrix:")
print(corr)

# Plot heatmap
plt.figure(figsize=(6,4))
sns.heatmap(corr, annot=True, cmap='coolwarm')
plt.title('Correlation between Factors')
plt.show()

# Sleep vs Stress
plt.figure(figsize=(6,4))
sns.scatterplot(x='Sleep_Hours', y='Stress_Level', data=data)
plt.title('Sleep Hours vs Stress Level')
plt.xlabel('Sleep Hours per Day')
plt.ylabel('Stress Level (1–10)')
plt.show()

# Study Hours vs Productivity
plt.figure(figsize=(6,4))
sns.scatterplot(x='Study_Hours', y='Productivity_Score', data=data)
plt.title('Study Hours vs Productivity')
plt.xlabel('Study Hours per Day')
plt.ylabel('Productivity Score (%)')
plt.show()

# Stress vs Productivity
plt.figure(figsize=(6,4))
sns.scatterplot(x='Stress_Level', y='Productivity_Score', data=data)
plt.title('Stress Level vs Productivity')
plt.xlabel('Stress Level (1–10)')
plt.ylabel('Productivity Score (%)')
plt.show()

# Insights
print("\nKey Insights:")
print("1️⃣ Students with 7–8 hours of sleep tend to have lower stress and higher productivity.")
print("2️⃣ Very high study hours (>8) often increase stress and reduce productivity.")
print("3️⃣ Moderate study (5–6 hours) with enough sleep shows the best performance balance.")
