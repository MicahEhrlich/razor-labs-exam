import { describe, it, expect } from 'vitest';
import type { Diagnostic, FaultType, Severity } from "../../types";
import { addNewDiagnostic } from "../../utils";

describe('addDiagnosis', () => {
    it('adds a diagnosis with same day with a higher severity', () => {
        const initial = [{ date: '2025-02-19', id: 1, faultType: 'Bearing', severity: 'Alarm' },
        { date: '2025-02-18', id: 2, faultType: 'Gear', severity: 'Alarm' }, { date: '2025-02-12', id: 3, faultType: 'Gear', severity: 'Health' }] as Diagnostic[];
        const newItem = { date: '2025-02-18', faultType: 'Bearing', severity: 'Critical' };

        const updated = addNewDiagnostic(initial, newItem.date, newItem.faultType as FaultType, newItem.severity as Severity);

        expect(updated).toHaveLength(4);
        expect(updated[1].date).toEqual(newItem.date);
        expect(updated[1].faultType).toEqual(newItem.faultType);
        expect(updated[1].severity).toEqual(newItem.severity);
    });

    it('adds a diagnosis with same day with a lower severity', () => {
        const initial = [{ date: '2025-02-19', id: 1, faultType: 'Bearing', severity: 'Alarm' },
        { date: '2025-02-18', id: 2, faultType: 'Gear', severity: 'Alarm' }, { date: '2025-02-12', id: 3, faultType: 'Gear', severity: 'Health' }] as Diagnostic[];
        const newItem = { date: '2025-02-18', faultType: 'Motor', severity: 'Health' };

        const updated = addNewDiagnostic(initial, newItem.date, newItem.faultType as FaultType, newItem.severity as Severity);

        expect(updated).toHaveLength(4);
        expect(updated[2].date).toEqual(newItem.date);
        expect(updated[2].faultType).toEqual(newItem.faultType);
        expect(updated[2].severity).toEqual(newItem.severity);
    });

    it('adds a diagnosis with on a new day', () => {
        const initial = [{ date: '2025-02-19', id: 1, faultType: 'Bearing', severity: 'Alarm' },
        { date: '2025-02-18', id: 2, faultType: 'Gear', severity: 'Alarm' }, { date: '2025-02-12', id: 3, faultType: 'Gear', severity: 'Health' }] as Diagnostic[];
        const newItem = { date: '2025-02-20', faultType: 'Motor', severity: 'Health' };

        const updated = addNewDiagnostic(initial, newItem.date, newItem.faultType as FaultType, newItem.severity as Severity);

        expect(updated).toHaveLength(4);
        expect(updated[0].date).toEqual(newItem.date);
        expect(updated[0].faultType).toEqual(newItem.faultType);
        expect(updated[0].severity).toEqual(newItem.severity);
    });
});


