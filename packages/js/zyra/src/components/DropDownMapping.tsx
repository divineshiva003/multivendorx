/**
 * External dependencies
 */
import React, { useEffect, useRef, useState, useMemo } from 'react';

/**
 * Internal dependencies
 */
import '../styles/web/DropDownMapping.scss';

// Types
interface DropDownMappingProps {
    value?: [string, string][];
    onChange: (value: [string, string][]) => void;
    proSetting?: boolean;
    proSettingChanged: () => boolean;
    description?: string;
    syncFieldsMap: Record<
        string,
        { heading: string; fields: Record<string, string> }
    >;
}

const DropDownMapping: React.FC<DropDownMappingProps> = ({
    value = [],
    onChange,
    proSettingChanged,
    description,
    syncFieldsMap,
}) => {
    const systems = useMemo(
        () => Object.keys(syncFieldsMap),
        [syncFieldsMap]
    );

    const formattedValue = (value || []).filter(
        (pair) =>
            Array.isArray(pair) &&
            pair.length === 2 &&
            pair[0] &&
            pair[1]
    );

    const [selectedFields, setSelectedFields] =
        useState<[string, string][]>(formattedValue);

    const [availableFields, setAvailableFields] = useState<
        Record<string, string[]>
    >({});

    const settingChanged = useRef(false);

    /**
     * Compute available fields (NO infinite loop)
     */
    useEffect(() => {
        const updated: Record<string, string[]> = {};

        systems.forEach((system) => {
            updated[system] = Object.keys(
                syncFieldsMap[system].fields
            ).filter(
                (field) =>
                    !selectedFields.some(
                        ([a, b]) => a === field || b === field
                    )
            );
        });

        setAvailableFields(updated);
    }, [systems, selectedFields, syncFieldsMap]);

    /**
     * Update selected field
     */
    const changeSelectedFields = (
        index: number,
        value: string,
        systemIndex: number
    ) => {
        setSelectedFields((prev) =>
            prev.map((pair, i) => {
                if (i !== index) return pair;
                const updated = [...pair] as [string, string];
                updated[systemIndex] = value;
                return updated;
            })
        );

        settingChanged.current = true;
    };

    /**
     * Swap fields (TOGGLE FIX ✅)
     */
    const swapSelectedFields = (index: number) => {
        setSelectedFields((prev) =>
            prev.map((pair, i) =>
                i === index ? [pair[1], pair[0]] : pair
            )
        );

        settingChanged.current = true;
    };

    /**
     * Remove mapping
     */
    const removeSelectedFields = (index: number) => {
        setSelectedFields((prev) =>
            prev.filter((_, i) => i !== index)
        );

        settingChanged.current = true;
    };

    /**
     * Add mapping (IMMUTABLE FIX ✅)
     */
    const insertSelectedFields = () => {
        const systemA = systems[0];
        const systemB = systems[1];

        const listA = availableFields[systemA] || [];
        const listB = availableFields[systemB] || [];

        if (!listA.length || !listB.length) return;

        setSelectedFields((prev) => [
            ...prev,
            [listA[0], listB[0]],
        ]);

        setAvailableFields((prev) => ({
            ...prev,
            [systemA]: prev[systemA].slice(1),
            [systemB]: prev[systemB].slice(1),
        }));

        settingChanged.current = true;
    };

    /**
     * Trigger onChange only when user changes
     */
    useEffect(() => {
        if (settingChanged.current) {
            settingChanged.current = false;
            onChange(selectedFields);
        }
    }, [selectedFields, onChange]);

    return (
        <>
            <div className="dropdown-mapping-container">
                <div className="main-wrapper">
                    <div className="main-wrapper-heading">
                        <span>{syncFieldsMap[systems[0]].heading}</span>
                        <span>{syncFieldsMap[systems[1]].heading}</span>
                    </div>
                    <div className="map-content-wrapper">
                        <select className="basic-select" disabled>
                            <option value="email">Email</option>
                        </select>
                        <span className="connection-icon">⇌</span>
                        <select className="basic-select" disabled>
                            <option value="email">Email</option>
                        </select>
                    </div>

                    {selectedFields.map(
                        ([systemAField, systemBField], index) => (
                            <div
                                className="map-content-wrapper"
                                key={index}
                            >
                                {/* System A */}
                                <select
                                    className="basic-select"
                                    value={systemAField}
                                    onChange={(e) =>
                                        !proSettingChanged() &&
                                        changeSelectedFields(
                                            index,
                                            e.target.value,
                                            0
                                        )
                                    }
                                >
                                    <option value={systemAField}>
                                        {
                                            syncFieldsMap[systems[0]]
                                                .fields[systemAField]
                                        }
                                    </option>
                                    {availableFields[systems[0]]?.map(
                                        (option) => (
                                            <option
                                                key={option}
                                                value={option}
                                            >
                                                {
                                                    syncFieldsMap[
                                                        systems[0]
                                                    ].fields[option]
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                                {/* Swap Button */}
                                <button
                                    type="button"
                                    className="connection-icon swap-btn"
                                    onClick={() =>
                                        !proSettingChanged() &&
                                        swapSelectedFields(index)
                                    }
                                >
                                    ⇄
                                </button>

                                {/* System B */}
                                <select
                                    className="basic-select"
                                    value={systemBField}
                                    onChange={(e) =>
                                        !proSettingChanged() &&
                                        changeSelectedFields(
                                            index,
                                            e.target.value,
                                            1
                                        )
                                    }
                                >
                                    <option value={systemBField}>
                                        {
                                            syncFieldsMap[systems[1]]
                                                .fields[systemBField]
                                        }
                                    </option>
                                    {availableFields[systems[1]]?.map(
                                        (option) => (
                                            <option
                                                key={option}
                                                value={option}
                                            >
                                                {
                                                    syncFieldsMap[
                                                        systems[1]
                                                    ].fields[option]
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                                {/* Remove */}
                                <button
                                    className="admin-btn btn-purple remove-mapping"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        !proSettingChanged() &&
                                            removeSelectedFields(index);
                                    }}
                                >
                                    <span className="text">Clear</span>
                                    <span className="icon adminfont-close"></span>
                                </button>
                            </div>
                        )
                    )}
                </div>

                <div className="add-mapping-container">
                    <button
                        className="admin-btn btn-purple"
                        onClick={(e) => {
                            e.preventDefault();
                            !proSettingChanged() &&
                                insertSelectedFields();
                        }}
                    >
                        <span className="text">Add</span>
                        <i className="adminfont-vendor-form-add"></i>
                    </button>
                </div>
            </div>

            {description && (
                <p
                    className="settings-metabox-description"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            )}
        </>
    );
};

export default DropDownMapping;
