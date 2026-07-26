// Mock Data Service for KSP Crime Intelligence Platform

// 1. Overview KPIs
export const getStrategicKPIs = () => ({
  totalIncidents: 12450,
  incidentsTrend: '+5.2%',
  activeHotspots: 14,
  hotspotsTrend: '-2',
  arrestsMade: 8430,
  arrestsTrend: '+12.4%',
  predictiveRiskScore: 78,
  riskTrend: 'High'
});

// 2. Spatial Data (Districts in Karnataka)
export const getDistrictsData = () => [
  { id: 'D01', name: 'Bengaluru Urban', lat: 12.9716, lng: 77.5946, crimeRate: 85, risk: 'High' },
  { id: 'D02', name: 'Mysuru', lat: 12.2958, lng: 76.6394, crimeRate: 45, risk: 'Medium' },
  { id: 'D03', name: 'Hubballi-Dharwad', lat: 15.3647, lng: 75.1240, crimeRate: 60, risk: 'High' },
  { id: 'D04', name: 'Mangaluru', lat: 12.9141, lng: 74.8560, crimeRate: 40, risk: 'Medium' },
  { id: 'D05', name: 'Belagavi', lat: 15.8497, lng: 74.4977, crimeRate: 35, risk: 'Low' },
  { id: 'D06', name: 'Kalaburagi', lat: 17.3297, lng: 76.8343, crimeRate: 50, risk: 'Medium' },
  { id: 'D07', name: 'Ballari', lat: 15.1394, lng: 76.9214, crimeRate: 55, risk: 'High' }
];

// Heatmap Data (Spatiotemporal Clusters)
export const getCrimeHotspots = () => {
  // Generate random clusters around major cities
  const hotspots = [];
  const cities = getDistrictsData();
  
  cities.forEach(city => {
    const numPoints = city.crimeRate * 2;
    for (let i = 0; i < numPoints; i++) {
      hotspots.push([
        city.lat + (Math.random() - 0.5) * 0.1,
        city.lng + (Math.random() - 0.5) * 0.1,
        Math.random() * 100 // Intensity
      ]);
    }
  });
  return hotspots;
};

// 3. Network Link Analysis Data
export const getNetworkData = () => {
  const nodes = [
    { id: 'S1', name: 'Ravi K.', type: 'Suspect', group: 1, val: 20 },
    { id: 'S2', name: 'Mohammed A.', type: 'Suspect', group: 1, val: 15 },
    { id: 'S3', name: 'Kumar V.', type: 'Suspect', group: 1, val: 10 },
    { id: 'V1', name: 'Store A', type: 'Victim', group: 2, val: 5 },
    { id: 'V2', name: 'Bank Br.', type: 'Victim', group: 2, val: 8 },
    { id: 'L1', name: 'Majestic Area', type: 'Location', group: 3, val: 12 },
    { id: 'L2', name: 'K R Puram', type: 'Location', group: 3, val: 12 },
    { id: 'C1', name: 'Vehicle Theft Ring', type: 'Organization', group: 4, val: 25 },
  ];

  const links = [
    { source: 'S1', target: 'C1', type: 'Member' },
    { source: 'S2', target: 'C1', type: 'Member' },
    { source: 'S3', target: 'S1', type: 'Associate' },
    { source: 'S1', target: 'L1', type: 'Spotted At' },
    { source: 'S2', target: 'L2', type: 'Spotted At' },
    { source: 'C1', target: 'V1', type: 'Targeted' },
    { source: 'C1', target: 'V2', type: 'Targeted' },
    { source: 'S3', target: 'L1', type: 'Spotted At' }
  ];

  return { nodes, links };
};

// 4. Predictive & Trend Data
export const getTrendData = () => [
  { month: 'Jan', actual: 400, predicted: 410, risk: 45 },
  { month: 'Feb', actual: 380, predicted: 390, risk: 42 },
  { month: 'Mar', actual: 420, predicted: 400, risk: 50 },
  { month: 'Apr', actual: 450, predicted: 430, risk: 58 },
  { month: 'May', actual: 480, predicted: 460, risk: 65 },
  { month: 'Jun', actual: 520, predicted: 500, risk: 75 },
  { month: 'Jul', actual: 500, predicted: 540, risk: 72 },
  { month: 'Aug', actual: null, predicted: 560, risk: 80 },
  { month: 'Sep', actual: null, predicted: 510, risk: 68 },
];

export const getSocioEconomicData = () => [
  { district: 'Bengaluru U.', crimeRate: 85, unemployment: 6.2, populationDensity: 4381 },
  { district: 'Mysuru', crimeRate: 45, unemployment: 4.8, populationDensity: 476 },
  { district: 'Hubballi', crimeRate: 60, unemployment: 5.5, populationDensity: 432 },
  { district: 'Mangaluru', crimeRate: 40, unemployment: 4.1, populationDensity: 457 },
  { district: 'Belagavi', crimeRate: 35, unemployment: 4.5, populationDensity: 356 },
];

// 5. 360-Degree Entity Resolution (Mapping: CaseMaster, Victim, Accused, Complainant)
export const getEntityProfile = (entityId = 'E123') => {
  return {
    id: entityId,
    name: 'Vikram S.',
    demographics: 'Male, 34 yrs',
    riskScore: 82,
    timeline: [
      { date: '2023-04-12', role: 'Victim', caseNo: '104430006202300122', type: 'Assault', status: 'Charge Sheeted' },
      { date: '2024-01-05', role: 'Complainant', caseNo: '104430006202400015', type: 'Theft', status: 'Under Investigation' },
      { date: '2025-11-20', role: 'Accused', caseNo: '104430006202500890', type: 'Organized Extortion', status: 'Arrested' }
    ]
  };
};

// 6. Justice Pipeline Analytics (Mapping: ActSectionAssociation, CaseStatusMaster, ChargesheetDetails, Court)
export const getJusticePipelineData = () => {
  return {
    nodes: [
      { name: 'FIR Registered' },
      { name: 'Investigation Closed (Lack of Ev)' },
      { name: 'Arrest / Surrender' },
      { name: 'Charge Sheet Filed' },
      { name: 'Court Trial Ongoing' },
      { name: 'Conviction' },
      { name: 'Acquittal' }
    ],
    links: [
      { source: 0, target: 1, value: 35 },
      { source: 0, target: 2, value: 65 },
      { source: 2, target: 3, value: 55 },
      { source: 2, target: 1, value: 10 },
      { source: 3, target: 4, value: 55 },
      { source: 4, target: 5, value: 20 },
      { source: 4, target: 6, value: 35 }
    ]
  };
};

// 7. AI Fairness & Bias Auditing
export const getAIFairnessData = () => {
  return {
    featureImportance: [
      { feature: 'Historical Arrest Rate', importance: 0.85, biasRisk: 'High' },
      { feature: 'Socio-Economic Index', importance: 0.65, biasRisk: 'Medium' },
      { feature: 'Recent 911 Calls', importance: 0.90, biasRisk: 'Low' },
      { feature: 'Time of Day', importance: 0.40, biasRisk: 'Low' },
      { feature: 'Demographic Density', importance: 0.55, biasRisk: 'High' }
    ],
    demographicParity: [
      { group: 'District A (High Income)', predictedRisk: 42, actualIncidentRate: 40 },
      { group: 'District B (Low Income)', predictedRisk: 88, actualIncidentRate: 65 }
    ]
  };
};

// 8. Complex Post-Import AI Graph Data
export const getComplexNetworkData = () => {
  const nodes = [];
  const links = [];
  
  // Core nodes
  nodes.push({ id: 'Org1', name: 'Shell Corp Alpha', type: 'Organization', group: 4, val: 30 });
  nodes.push({ id: 'Org2', name: 'Front Company X', type: 'Organization', group: 4, val: 25 });
  nodes.push({ id: 'Loc1', name: 'Offshore Account', type: 'Location', group: 3, val: 20 });
  
  // Generate 35 suspects
  for(let i=1; i<=35; i++) {
    nodes.push({ id: `S${i}`, name: `Alias_${i}`, type: 'Suspect', group: 1, val: Math.random() * 10 + 5 });
    
    // Link to main orgs randomly
    if (Math.random() > 0.6) links.push({ source: `S${i}`, target: 'Org1', type: 'Employee' });
    if (Math.random() > 0.8) links.push({ source: `S${i}`, target: 'Org2', type: 'Director' });
    
    // Link to offshore
    if (Math.random() > 0.9) links.push({ source: `S${i}`, target: 'Loc1', type: 'Transfer' });
    
    // Link to each other to create clusters
    if (i > 1 && Math.random() > 0.7) {
      links.push({ source: `S${i}`, target: `S${Math.floor(Math.random() * i) + 1}`, type: 'Call Record' });
    }
  }
  
  // Generate victims
  for(let i=1; i<=15; i++) {
    nodes.push({ id: `V${i}`, name: `Target_Account_${i}`, type: 'Victim', group: 2, val: 8 });
    if (Math.random() > 0.5) links.push({ source: 'Org1', target: `V${i}`, type: 'Defrauded' });
  }

  return { nodes, links };
};

// 9. Hubballi Smuggling Ring Data (c2)
export const getHubballiData = () => {
  const nodes = [
    { id: 'H1', name: 'Sandeep R.', type: 'Suspect', group: 1, val: 25 },
    { id: 'H2', name: 'Logistics Co.', type: 'Organization', group: 4, val: 30 },
    { id: 'H3', name: 'Border Checkpoint', type: 'Location', group: 3, val: 15 },
    { id: 'H4', name: 'Warehouse 4', type: 'Location', group: 3, val: 20 },
    { id: 'H5', name: 'Driver_001', type: 'Suspect', group: 1, val: 10 },
    { id: 'H6', name: 'Driver_002', type: 'Suspect', group: 1, val: 10 }
  ];
  const links = [
    { source: 'H1', target: 'H2', type: 'Owner' },
    { source: 'H2', target: 'H4', type: 'Operates' },
    { source: 'H5', target: 'H2', type: 'Employed' },
    { source: 'H6', target: 'H2', type: 'Employed' },
    { source: 'H5', target: 'H3', type: 'Crossed' },
    { source: 'H6', target: 'H3', type: 'Crossed' },
    { source: 'H1', target: 'H3', type: 'Bribed Official' }
  ];
  return { nodes, links };
};

// 10. Financial Fraud Nexus Data (c3)
export const getFinancialData = () => {
  const nodes = [
    { id: 'F1', name: 'Fake Call Center', type: 'Organization', group: 4, val: 35 },
    { id: 'F2', name: 'Victim List A', type: 'Victim', group: 2, val: 20 },
    { id: 'F3', name: 'Victim List B', type: 'Victim', group: 2, val: 20 },
    { id: 'F4', name: 'Crypto Wallet X', type: 'Location', group: 3, val: 30 },
    { id: 'F5', name: 'Crypto Wallet Y', type: 'Location', group: 3, val: 30 },
    { id: 'F6', name: 'Mastermind', type: 'Suspect', group: 1, val: 40 }
  ];
  const links = [
    { source: 'F6', target: 'F1', type: 'Funds' },
    { source: 'F1', target: 'F2', type: 'Scammed' },
    { source: 'F1', target: 'F3', type: 'Scammed' },
    { source: 'F2', target: 'F4', type: 'Transfer' },
    { source: 'F3', target: 'F5', type: 'Transfer' },
    { source: 'F4', target: 'F6', type: 'Laundered' },
    { source: 'F5', target: 'F6', type: 'Laundered' }
  ];
  return { nodes, links };
};
