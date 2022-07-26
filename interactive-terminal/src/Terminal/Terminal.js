import React, { useState } from "react";
import './Terminal.css'; 

export default function Terminal( {  } ) {
    
    const [currentCommand, setCurrentCommand] = useState('')
    
    const handleKeyPress = (e) => {
        console.log(e)
        if (typeof e.which == 'undefined')  {
            // 
        } else if (typeof e.which == 'number' && e.which > 0) {
            if (!e.ctrlKey && !e.metaKey && !e.altKey && e.which != 8){
                setCurrentCommand(currentCommand + e.key)
            } else if (e.which == 8) {
                setCurrentCommand(currentCommand)
            }
        }
    }; 

    return ( 
        <div className='container' onKeyDown={handleKeyPress} tabIndex='0'>
            <h1 className='text' >
             {'> ' + currentCommand}
            </h1>
        </div>  
    )   
}

