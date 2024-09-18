import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Shield, AlertTriangle, FileText, Calendar } from "lucide-react";

const BreachMetricsDashboard = ({ data }) => {
  const { BreachMetrics, BreachesSummary, ExposedBreaches } = data;
  const breach = ExposedBreaches.breaches_details[0];

  const yearwiseData = Object.entries(BreachMetrics.yearwise_details[0])
    .map(([year, count]) => ({ year: year.slice(1), count }))
    .filter((item) => item.count > 0);

  const riskScore = BreachMetrics.risk[0].risk_score;
  const riskLabel = BreachMetrics.risk[0].risk_label;

  const getRiskColor = (score) => {
    if (score <= 3) return "bg-green-500";
    if (score <= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Breach Metrics Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Breach Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2" /> Breach Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Site:</strong> {BreachesSummary.site}
            </p>
            <p>
              <strong>Domain:</strong> {breach.domain}
            </p>
            <p>
              <strong>Industry:</strong> {breach.industry}
            </p>
            <p>
              <strong>Exposed Date:</strong> {breach.xposed_date}
            </p>
            <p>
              <strong>Exposed Records:</strong>{" "}
              {breach.xposed_records.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Risk Assessment Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2" /> Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <div
                className={`w-16 h-16 rounded-full ${getRiskColor(
                  riskScore
                )} flex items-center justify-center text-white font-bold text-xl mr-4`}
              >
                {riskScore}
              </div>
              <div>
                <p className="font-semibold">Risk Score: {riskScore}</p>
                <p>Risk Label: {riskLabel}</p>
              </div>
            </div>
            <Alert>
              <AlertTitle>Password Strength</AlertTitle>
              <AlertDescription>
                {Object.entries(BreachMetrics.passwords_strength[0]).map(
                  ([key, value]) => (
                    <p key={key}>
                      {key}: {value}
                    </p>
                  )
                )}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Exposed Data Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" /> Exposed Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {breach.xposed_data.split(";").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Yearly Breach Distribution Card */}
        <Card className="col-span-full md:col-span-2 h-64">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" /> Yearly Breach Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <div className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearwiseData}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BreachMetricsDashboard;
