import React, { Component } from 'react';
import Service from '../components/Service';

class Configs extends Component {
    constructor(props){
        super(props);
        this.state = {
            configs: []
        }

    }

    componentDidMount(){
        this.getConfigs();
    }

    // get configurations
    getConfigs=()=>{
        Service.get('/config',(res)=>{
           this.setState({configs: res});
        })
    }

    // redirect to create page
    createNewConfig=()=>{
        window.location.href = '/config/create';
    }

    // redirect to single config page
    editConfig=(name, version)=>{
        window.location.href = '/config/'+name+'/'+version;
    }

    render(){
        return(
            <div className="content">
                <h1 className="title">Configurations</h1>
                <button className="create-config-btn" onClick={this.createNewConfig}>Create new configuration</button>
                <table id="configs-table">
                    <thead>
                        <tr>
                            <th>Configuration name</th>
                            <th>Configuration version</th>
                            <th className="right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.configs.map(function(item, index){
                            return(
                                <tr key={index}>
                                    <td>{item.config_name}</td>
                                    <td>{item.config_version}</td>
                                    <td className="right"><button onClick={()=>{this.editConfig(item.config_name, item.config_version)}}>View</button></td>
                                </tr>
                            )}, this)
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Configs;