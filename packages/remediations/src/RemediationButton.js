import React from 'react';
import * as pfReactTable from '@patternfly/react-table';

import propTypes from 'prop-types';
import { reactCore } from '../../utils/src/inventoryDependencies';

import { CAN_REMEDIATE } from './utils';

function getLoader () {
    return (insights.experimental && insights.experimental.loadRemediations) || insights.loadRemediations;
}

class RemediationButton extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            remediations: false,
            hasPermission: false
        };
    }

    componentDidMount() {
        Promise.all([
            getLoader()({
                react: React,
                reactCore,
                pfReactTable
            }),
            insights.chrome.getUserPermissions('remediations')
        ]).then(([
            remediations,
            permissions
        ]) => {
            this.setState({
                remediations,
                hasPermission: permissions.some(({ permission }) => permission === CAN_REMEDIATE)
            });
        });
    }

    onClick = () => {
        Promise.resolve(this.props.dataProvider())
        .then(data => this.state.remediations.openWizard(data))
        .then(result => result && this.props.onRemediationCreated(result));
    }

    render() {
        if (this.state.remediations && !this.state.hasPermission) {
            return (
                <reactCore.Tooltip
                    content="You do not have correct permissions to execute remediations on this entity."
                >
                    <span>
                        <reactCore.Button isDisabled>
                            { this.props.children }
                        </reactCore.Button>
                    </span>
                </reactCore.Tooltip>
            );
        }

        return (
            <React.Fragment>
                <reactCore.Button
                    isDisabled={ this.props.isDisabled || this.state.remediations === false }
                    onClick={ this.onClick } >
                    { this.props.children }
                </reactCore.Button>

                { this.state.remediations.RemediationWizard && <this.state.remediations.RemediationWizard /> }
            </React.Fragment>
        );
    }
}

RemediationButton.propTypes = {
    isDisabled: propTypes.bool,
    dataProvider: propTypes.func.isRequired,
    onRemediationCreated: propTypes.func,
    children: propTypes.node
};

RemediationButton.defaultProps = {
    isDisabled: false,
    onRemediationCreated: f => f,
    children: 'Remediate with Ansible'
};

export default RemediationButton;
