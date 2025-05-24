export type Severity = 'Critical' | 'Alarm' | 'Healthy';

export type FaultType = 'Bearing' | 'Gear' | 'Motor';

export type Diagnostic = {
    id: number;
    date: string;
    faultType: FaultType;
    severity: Severity;
}

export const severityRank: Record<Severity, number> = {
    Critical: 3,
    Alarm: 2,
    Healthy: 1,
};