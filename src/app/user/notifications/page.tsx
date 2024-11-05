"use client";
import React, { useState } from 'react';
const NotificationsPage: React.FC = () => {
    return(
        <div className='notifications-page'>
            <button className="back-button" onClick={() => window.history.back()}>Back to Dashboard</button>
        </div>
    )
}
export default NotificationsPage;
