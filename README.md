# Karnataka State Police (KSP) - Crime Intelligence & Analytical Platform

This repository contains the prototype for a state-of-the-art Crime Intelligence Platform designed to shift KSP from reactive, siloed Excel-based reporting to a proactive, AI-driven strategic intelligence hub.

## 🌟 Key Features

1. **Strategic Intelligence Dashboard**
   - High-level KPIs, predictive risk scores, and real-time AI anomaly alerts.
   - Powered by dynamic charts comparing actual vs predicted incidents.

2. **Geospatial Command Center**
   - District-level interactive maps using Leaflet.
   - Overlay of crime hotspots and spatiotemporal clusters.

3. **Criminological Link Analysis**
   - Node-based network graph visualizing the Modus Operandi (MO) and criminal associations.
   - Uncovers hidden relationships between suspects, victims, and locations.

4. **Predictive Intelligence & Sociological Correlation**
   - AI-driven dashboards correlating socio-economic factors (unemployment, urbanization) with crime rates.
   - Scatter and bar chart visualizations for resource deployment insights.

5. **360° Entity Resolution**
   - Eliminates data silos by unifying records across `Victim`, `Complainant`, and `Accused` databases to provide a complete timeline of an individual's interactions with the judicial system.

6. **Justice Pipeline & Prosecution Analytics**
   - Shifts the focus from pre-crime prediction to actual judicial outcomes.
   - Visualizes the drop-off rates from FIR -> Arrest -> Chargesheet -> Court using a stunning custom funnel flow, identifying systemic bottlenecks.

7. **AI Fairness & Bias Auditing Dashboard**
   - Solves the "Black Box" problem by providing Model Explainability (SHAP values).
   - Monitors Demographic Parity to ensure predictive models do not inadvertently cause over-policing based on dirty historical data.

8. **Multimodal Crime Scene Analysis (Forensics)**
   - Complete digital forensic toolkit capable of processing crime scene media.
   - **Fingerprint Reconstruction:** Simulates GAN/Autoencoder processing to enhance degraded prints.
   - **Weapon Detection:** Demonstrates real-time bounding box capability using YOLO-NAS architecture.
   - **Human Activity Recognition (HAR):** Evaluates behavioral cues via VGG-16 networks.

## 🛠 Technology Stack

- **Frontend Framework:** React 18 + Vite
- **Routing:** React Router DOM
- **State & Data:** Functional Components with Hooks + Mock Service Layer
- **Styling:** Premium Custom CSS (Glassmorphism, Dark Theme, CSS Variables)
- **Data Visualization:** Recharts
- **Geospatial Mapping:** React-Leaflet & Leaflet.js (CARTO Dark Tiles)
- **Network Link Analysis:** React Force Graph 2D
- **Icons:** Lucide React

## 🚀 Setup and Execution Instructions

### Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *The application will run locally at `http://localhost:5173/`.*

3. **Build for Production:**
   ```bash
   npm run build
   ```
   *Outputs optimized static files to the `dist` directory.*

### Catalyst Deployment

To deploy this platform on the Catalyst ecosystem as a Web Client:

1. Install the Catalyst CLI:
   ```bash
   npm install -g zcatalyst-cli
   ```
2. Initialize a Catalyst project in this directory:
   ```bash
   catalyst init
   ```
   *(Select `Client` and set the source directory to `dist`)*
3. Build the React app:
   ```bash
   npm run build
   ```
4. Deploy to Catalyst:
   ```bash
   catalyst deploy
   ```

## 📈 Impact

By implementing this platform, the SCRB will gain the capability to preemptively deploy resources, link organized crime across jurisdictions, and formulate evidence-based policies by understanding the socio-economic drivers of crime.
