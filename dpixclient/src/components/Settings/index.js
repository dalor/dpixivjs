import React from "react";
import "./Settings.css"
import MenuWrapper from "../MenuWrapper"
import Select from 'react-select'
import { connect } from "react-redux";
import { picPreviewQualities, picQualities, defaultSettings } from "../../config"

const findOptionByName = (opts, name) => name && opts.find(({ value }) => value === name)

const toOptions = (opts) => opts.map(({ name, title }) => ({ value: name, label: title }))

export default connect(
    (data) => ({ settings: data.settings || defaultSettings }),
    (dispatch) => ({
        setSettings: (settings) => dispatch({
            type: "saveData",
            data: { settings }
        })
    })
)(({ settings, setSettings }) => {

    const picOptions = toOptions(picQualities)

    const picPreviewOptions = toOptions(picPreviewQualities)

    const updateSettings = (newData) => setSettings(Object.assign(settings, newData))

    return (<MenuWrapper width="600px" height="400px">
        <div className="settings">
            <h2 className="center">Settings</h2>
            <div className="settings-title">
                Picture quality:
            </div>
            <Select
                className="settings-select"
                options={picOptions}
                defaultValue={findOptionByName(picOptions, settings.picQuality)}
                onChange={({ value }) => updateSettings({ picQuality: value })}
            />
            <div className="settings-title">
                Picture preview quality:
            </div>
            <Select
                className="settings-select"
                options={picPreviewOptions}
                defaultValue={findOptionByName(picPreviewOptions, settings.picPreviewQuality)}
                onChange={({ value }) => updateSettings({ picPreviewQuality: value })}
            />
        </div>
    </MenuWrapper>
    )
})