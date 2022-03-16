import React from 'react';
import {estilos} from './cardActivity.module.css'

export default function CardActivity(activity){
    return(
        <div>
            {activity && (
                <div>
                    <p>{activity.name}</p>
                    <p>{activity.season}</p>
                    <p>{activity.difficulty}</p>
                    <p>{activity.duration}</p>
                </div>
            )}
        </div>
    )
}