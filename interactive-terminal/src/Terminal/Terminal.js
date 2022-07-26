import React, { useState } from "react";
import './Terminal.css'; 

export default function Terminal( {  } ) {

    const [currentCommand, setCurrentCommand] = useState('')
    const [commandHistory, setCommandHistory] = useState([])
    let callback = () => {

    } 

    const handleKeyPress = (e) => {
        if (e.which == 13) {
            let output = handleCommand(currentCommand); 
            const new_dialog_entry = {
                input:currentCommand, 
                output:output
            }
            setCommandHistory(commandHistory.concat( [new_dialog_entry] )); 
            setCurrentCommand(''); 
            callback()
        }   
    }; 

    const handleChange = (e) => {
        setCurrentCommand(e.target.value.toUpperCase())
    }

    const handleCommand = (command) => {
        let subcommands = command.split(' '); 
        console.log( subcommands ) 
        let output = ''

        let command_to_function_mapping = {
            HJÄLP:help,
            SUDDA:eraseCommandHistory
        }

        if (subcommands[0] == 'SNÄLLA' && subcommands.length > 1) {
            if ( subcommands[1] in command_to_function_mapping ) {
                output = command_to_function_mapping[subcommands[1]]( subcommands.slice(2) ); 
            }
        } else {
            output = 'HMM, DU MISSADE NOG NÅGOT DÄR...\nVAD ÄR DET MAGISKA ORDET?'
        }

        return output
    }

    const help = (command) => {
        return 'KLART DU SKA FÅ LITE HJÄLP!'
    }

    const eraseCommandHistory = (command) => {
        callback = ()=>{setCommandHistory([])}
        return 'OKEJ DÅ'
    }

    return ( 
        <div className='container' tabIndex='0' onKeyDown={(e)=>{handleKeyPress(e)}}>
            <div className="output_window">
                {commandHistory.map((command_dialog, index) => {
                    return (
                        <div 
                            style={{
                                width:'100%', 
                                height:'70vh',  
                                display:'flex',
                                justifyContent:"flex-start", 
                                flexDirection:'column'
                            }} 
                            key={index}
                            >
                            <h1 className="text">
                                {'>'} {command_dialog.input}
                            </h1>
                            {
                            command_dialog.output.split('\n').map(element => {
                                return (
                                    <h1 className="text" style={{paddingLeft:'1em'}}>
                                        {element}
                                    </h1>
                                )
                            })
                            }
                        </div>
                    )
                })}
            </div>
            <input type='text' value={currentCommand} className='command_input' onChange={ (e)=>{ handleChange(e)}}/>
        </div>  
    )   
}

