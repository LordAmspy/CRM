import React from 'react';
import { BarChart3, Users, TrendingUp } from 'lucide-react';
import type { Candidate } from '../types';

interface AnalyticsProps {
  candidates: Candidate[];
}

export function Analytics({ candidates }: AnalyticsProps) {
  const totalLeads = candidates.length;
  const convertedLeads = candidates.filter(c => c.status === 'Converted').length;
  const conversionRate = totalLeads ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0';

  const affiliatePerformance = candidates.reduce((acc, curr) => {
    const key = `${curr.generatedBy}-${curr.affiliateId}`;
    if (!acc[key]) {
      acc[key] = { total: 0, converted: 0 };
    }
    acc[key].total++;
    if (curr.status === 'Converted') {
      acc[key].converted++;
    }
    return acc;
  }, {} as Record<string, { total: number; converted: number }>);

  const topAffiliates = Object.entries(affiliatePerformance)
    .map(([key, stats]) => ({
      name: key,
      conversionRate: (stats.converted / stats.total) * 100,
      totalLeads: stats.total,
    }))
    .sort((a, b) => b.conversionRate - a.conversionRate)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-blue-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Leads</p>
            <p className="text-2xl font-semibold text-gray-900">{totalLeads}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
            <p className="text-2xl font-semibold text-gray-900">{conversionRate}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-purple-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Active Affiliates</p>
            <p className="text-2xl font-semibold text-gray-900">
              {Object.keys(affiliatePerformance).length}
            </p>
          </div>
        </div>
      </div>

      {topAffiliates.length > 0 && (
        <div className="md:col-span-3 bg-white p-6 rounded-lg shadow mt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Affiliates</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Affiliate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Leads</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topAffiliates.map((affiliate, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{affiliate.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{affiliate.totalLeads}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {affiliate.conversionRate.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}