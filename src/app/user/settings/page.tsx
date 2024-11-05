"use client";
import React, { useState } from 'react';
const SettingsPage: React.FC = () => {
    return(
        <div className='settings-page'>
            <button className="back-button" onClick={() => window.history.back()}>Back to Dashboard</button>
        </div>
    )
}
export default SettingsPage;