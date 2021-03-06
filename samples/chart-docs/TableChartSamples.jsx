/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { Grid, Button } from 'material-ui';
import ChartWrapper from '../ChartWrapper';
import VizG from '../../src/VizG';
import { syntaxHighlight } from './util/SyntaxHighLight';
import Header from '../components/Header';
import { makeData } from './util/MakeData';
import ServerSidePagination from './TableChartServerSidePagination';

export default class TableChartSamples extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                [0, 10, 1, 'Piston'],
            ],
            timer: 1,
        };

        this.tableChartConfig = {
            charts: [
                {
                    type: 'table',
                    columns: [
                        {
                            name: 'EngineType',
                            title: 'EngineType',
                            colorBasedStyle: true,
                        },
                        {
                            name: 'torque',
                            title: 'Engine Torque',
                        },
                        {
                            name: 'rpm',
                            title: 'Engine RPM',
                            colorBasedStyle: true,
                            colorScale: ['red'],
                        },
                    ],
                },
            ],
            maxLength: 7,
            colorBasedStyle: true,
            pagination: true,
        };

        this.normalTableConfig = {
            charts: [
                {
                    type: 'table',
                    columns: [
                        {
                            name: 'firstName',
                            title: 'First Name',
                        },
                        {
                            name: 'lastName',
                            title: 'Last Name',
                        },
                        {
                            name: 'age',
                            title: 'Age',
                        },
                        {
                            name: 'visits',
                            title: 'Visits',
                        },
                        {
                            name: 'status',
                            title: 'status',
                        },
                    ],
                },
            ],
            pagination: true,
            filterable: true,
            append: false,
        };

        this.metadata = {
            names: ['rpm', 'torque', 'horsepower', 'EngineType'],
            types: ['linear', 'linear', 'ordinal', 'ordinal'],
        };

        this.intervalObj = null;

        this.normalDataSet = makeData();
        this.normalDataSetMetadata = {
            names: ['firstName', 'lastName', 'age', 'visits', 'status'],
            types: ['ordinal', 'ordinal', 'linear', 'linear', 'linear'],
        };
    }

    componentDidMount() {
        this.intervalObj = setInterval(() => {
            this.setState({
                data: [
                    [Math.round(Math.random() * 100), Math.round(Math.random() * 100), 1, 'Piston'],
                    [Math.round(Math.random() * 100), Math.round(Math.random() * 100), 1, 'rotary'],
                ],
                timer: this.state.timer + 1,
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalObj);
    }


    render() {

        return (
            <div>
                <Header url={'/samples'} title={'Table Chart Samples'} />
                <Grid container>
                    <Grid item lg={6} sm={12} xs={12}>
                        <ChartWrapper
                            title={'Table Chart Sample'}
                            chart={'table'}
                            actionBar={false}
                        >
                            <div style={{ height: 400 }}>
                                <div style={{ height: 40 }}>
                                    <VizG
                                        config={this.tableChartConfig}
                                        metadata={this.metadata}
                                        data={this.state.data}
                                        theme={this.props.theme}
                                    />
                                </div>
                            </div>
                            <div>
                                <pre
                                    dangerouslySetInnerHTML={
                                        {
                                            __html: syntaxHighlight(
                                                JSON.stringify(this.tableChartConfig, undefined, 4)),
                                        }
                                    }
                                />
                            </div>
                        </ChartWrapper>
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
                        <ChartWrapper
                            title={'Data Table Chart Sample'}
                            chart={'table'}
                            actionBar={false}
                        >
                            <div style={{ height: 400 }}>
                                <div style={{ height: 40 }}>
                                    <VizG
                                        config={this.normalTableConfig}
                                        metadata={this.normalDataSetMetadata}
                                        data={this.normalDataSet}
                                        theme={this.props.theme}
                                    />
                                </div>
                            </div>
                            <div>
                                <pre
                                    dangerouslySetInnerHTML={
                                        {
                                            __html: syntaxHighlight(
                                                JSON.stringify(this.normalTableConfig, undefined, 4)),
                                        }
                                    }
                                />
                            </div>
                        </ChartWrapper>
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
                        <ChartWrapper
                            title={'Server Side pagination Sample'}
                            chart={'table'}
                            actionBar={false}
                        >
                            <div style={{ height: 400 }}>
                                <div style={{ height: 40 }}>
                                    <ServerSidePagination />
                                </div>
                            </div>
                            <div>
                                <a href="https://github.com/wso2/react-vizgrammar/blob/master/samples/chart-docs/TableChartServerSidePagination.jsx">
                                    <Button raised color="primary">View Source</Button>
                                </a>
                            </div>
                        </ChartWrapper>
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
                        <ChartWrapper
                            title={'Sample Data set and JSON configuration structure.'}
                            chart={'table'}
                            actionBar={false}
                        >
                            <div className="json-structure" >
                                metadata:
                                <pre
                                    dangerouslySetInnerHTML={{
                                        __html: syntaxHighlight(
                                            JSON.stringify(this.metadata, undefined, 4)),
                                    }}
                                />
                                data:
                                <pre
                                    dangerouslySetInnerHTML={{
                                        __html: syntaxHighlight(
                                            JSON.stringify(this.state.data, undefined, 4)),
                                    }}
                                />
                                <br /><br />
                                <h3>Chart Configuration JSON structure</h3>
                                <ul>
                                    <li>
                                        <strong>charts</strong> - Array of Chart objects that should be visualized.
                                        <ul>
                                            <li>
                                                <strong>Chart Object</strong>
                                                <ul>
                                                    <li>
                                                        <strong>type</strong> - Type of the chart that need to be
                                                        visualized in this case &qoute;table&qoute;
                                                    </li>
                                                    <li>
                                                        <strong>uniquePropertyColumn</strong> - To stop duplication of data
                                                    </li>
                                                    <li>
                                                        <strong>columns</strong> - Array of objects containing
                                                        column data
                                                        <ul>
                                                            <li>
                                                                <strong>name</strong> - name provided in metadata
                                                            </li>
                                                            <li>
                                                                <strong>title</strong> - Title of the column
                                                            </li>
                                                            <li>
                                                                <strong>colorScale</strong> - Set of colors to be used
                                                                for the color categorization of the column
                                                            </li>
                                                            <li >
                                                                <strong>colorDomain</strong> - If a certain color category
                                                                needs to be highlighted in a specific color.
                                                            </li>
                                                            <li>
                                                                <strong>timeFormat</strong> - If data in the column are
                                                                &nbsp;timestamps the user can use this attribute to&nbsp;
                                                                format
                                                                the time stamp.refer&nbsp;
                                                                <a href={'https://github.com/d3/d3-time-format/blob/master/README.md#timeFormat'}>
                                                                    d3 documentation
                                                                </a> for more info
                                                            </li>
                                                            <li>
                                                                <strong>textColor</strong> - Color of the text in the&nbsp;
                                                                cell(* if the column use colorBased categorizing this option is recommended)
                                                            </li>
                                                            <li>
                                                                <strong>colorBasedStyle</strong> - color the column data according to the type
                                                                of data in the columns(boolean value)
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>maxLength</strong> - maximum number of records to be shown in the table
                                        at a time
                                    </li>
                                    <li>
                                        <strong>pagination</strong> - boolean value to show pagination for table chart
                                        or not default: false
                                    </li>
                                    <li>
                                        <strong>append</strong> -  Append the incoming data to the existing dataset or
                                        replace the existing dataset boolean value.
                                    </li>
                                    <li>
                                        <strong>filterable</strong> -  Boolean value to specify whether the data in the table are filterable.
                                    </li>
                                </ul>
                            </div>
                        </ChartWrapper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
