import React, { Component, Fragment } from 'react';
import Service from '../components/Service';
import AlertMessage from '../components/AlertMessage';
import ReactJson from 'react-json-view'

class ConfigEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            configName: '',
            configVersion: '',
            data: {},
            previewData: {},
            isEditConfig: false,
            resMessage: '',
            resCode: ''
        }

    }

    componentDidMount(){
        if(this.props.match.params.name && this.props.match.params.version){
            this.getConfig();
        }
    }

    // edit config
    createConfig=()=>{
        Service.postAuth('/config',{
            data: this.state.data,
            name: this.state.configName,
            version: this.setVersion(this.state.configVersion)
        },(res)=>{
            this.setState({
                resMessage: res.Message,
                resCode: res.Code
            });
        });
    }

    // get single config
    getConfig=()=>{
        Service.get('/config/'+this.props.match.params.name+'?version='+this.props.match.params.version,(res)=>{
            this.setState({
                configName: res.config_name,
                configVersion: res.config_version,
                data: res.data,
                previewData: res.data
            });
        });
    }

    setData=(e)=>{
        this.setState({data: e.updated_src, resMessage: ''});
    }

    isEditConfig=()=>{
        this.setState({isEditConfig: !this.state.isEditConfig, resMessage: ''});
    }

    // set version number
    setVersion=(currentVersion)=>{
        let versionNumber = currentVersion.replace(/\./g,'');
    
        let third = Math.floor((versionNumber / 1) % 10);
        let second = Math.floor((versionNumber / 10) % 10);
        let first = Math.floor((versionNumber / 100) % 10);

        let num = ''; 

        if((third + 1) <= 9){
            num = first +"."+second+"."+(third+1);
        }else if((second+1)<=9){
            num = first +"."+(second+1)+"."+0;
        }else{
            num = (parseInt(first)+1) +"."+0+"."+0
        }

        return num;
    }

    render(){
        return(
            <div className="content">
                <div className="edit-config-container">
                    <h1 className="title">Configuration</h1>
                    {!this.state.isEditConfig ?
                        <button className="edit-config-btn" onClick={()=>{this.isEditConfig()}}>Edit configuration</button>
                        :
                        <button className="edit-config-btn" onClick={()=>{this.isEditConfig()}}>View {this.props.match.params.name} {this.props.match.params.version}</button>
                    }
                    <div className="edit-config-box">
                        {!this.state.isEditConfig ? 
                            <pre>
                                <h3>{this.state.configName} {this.state.configVersion}</h3>
                                <h4>data:</h4>
                                <code>{JSON.stringify(this.state.previewData, null, 4)}</code>
                            </pre>
                            :
                            <Fragment>
                                <h3>Edit {this.state.configName} {this.state.configVersion} data:</h3>
                                <ReactJson src={this.state.data} name="data" onEdit={this.setData} onAdd={this.setData} onDelete={this.setData} defaultValue={''} style={{fontSize:"16px", fontFamily: "-webkit-pictograph"}}/>
                                <button onClick={this.createConfig}>Submit</button>
                            </Fragment>
                        }
                    </div>
                    
                    {this.state.resMessage &&
                        <AlertMessage message={this.state.resMessage} code={this.state.resCode}/>
                    }
                </div>
            </div>
        );
    }

}

export default ConfigEdit;