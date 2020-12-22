import React, { Component } from 'react';
import Service from '../components/Service';
import AlertMessage from '../components/AlertMessage';
import ReactJson from 'react-json-view';

class ConfigCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            configName: '',
            configVersion: '1.0.0',
            data: {},
            resMessage: '',
            resCode: ''
        }

    }

    handleInput=(event)=>{
        this.setState({[event.target.id]: event.target.value.replace(/\s/g, ''), resMessage: ''});
    }

    createConfig=()=>{
        Service.postAuth('/config',{
            data: this.state.data,
            name: this.state.configName,
            version: this.state.configVersion
        },(res)=>{
            this.setState({
                resMessage: res.Message,
                resCode: res.Code
            })
        });
    }

    setData=(e)=>{
        this.setState({data: e.updated_src, resMessage: ''});
    }

    render(){
        return(
            <div className="content">
                <div className="create-config-container">
                    <h1 className="title">Create new configuration</h1>
                    <div className="create-config-box">
                        <label htmlFor="configName">Name</label>
                        <input type="text" id='configName' value={this.state.configName} onChange={this.handleInput}/>

                        <label htmlFor="configVersion">Version</label>
                        <input type="text" id='configVersion' value={this.state.configVersion} onChange={this.handleInput} readOnly/>
                    
                        <label>Data</label>
                        <ReactJson src={this.state.data} onEdit={this.setData} onAdd={this.setData} onDelete={this.setData} name={false} defaultValue={''} style={{fontSize:"16px", fontFamily: "-webkit-pictograph"}}/>
                        
                        <button onClick={this.createConfig}>Submit</button>
                    </div>

                    {this.state.resMessage &&
                        <AlertMessage message={this.state.resMessage} code={this.state.resCode}/>
                    }
                </div>
            </div>
        );
    }

}

export default ConfigCreate;