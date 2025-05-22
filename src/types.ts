export type Severity = 'Critical' | 'Alarm' | 'Healthy';

export type FaultType = 'Bearing' | 'Gear' | 'Motor';

export type Diagonostic = {
    id: number;
    date: string;
    faultType: FaultType;
    severity: Severity;
}
