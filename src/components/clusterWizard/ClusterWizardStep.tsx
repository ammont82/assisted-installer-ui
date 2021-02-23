import React from 'react';
import { WizardBody, WizardNav, WizardNavItem, WizardNavItemProps } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Wizard/wizard';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { global_danger_color_100 as dangerColor } from '@patternfly/react-tokens';
import { Cluster } from '../../api/types';
import ClusterWizardContext from './ClusterWizardContext';
import {
  canNextBaremetalDiscovery,
  canNextClusterDetails,
  canNextNetwork,
  ClusterWizardStepsType,
  wizardStepsValidationsMap,
} from './wizardTransition';

import './ClusterWizardStep.css';

type ClusterWizardStepProps = {
  cluster?: Cluster;
  footer?: React.ReactNode;
};

const wizardSteps = Object.keys(wizardStepsValidationsMap) as ClusterWizardStepsType[];

export const wizardStepNames: {
  [key in ClusterWizardStepsType]: string;
} = {
  'cluster-details': 'Cluster Details',
  'baremetal-discovery': 'Bare Metal Discovery',
  networking: 'Networking',
  review: 'Review & Create',
};

const NavItem: React.FC<WizardNavItemProps & { isValid?: () => boolean }> = ({
  isValid = () => true,
  ...props
}) => {
  const { content, isDisabled, isCurrent } = props;

  let validatedLinkName = content;
  if (!isDisabled && !isCurrent && !isValid()) {
    validatedLinkName = (
      <>
        {content}
        <ExclamationCircleIcon
          className="wizard-nav-item-warning-icon"
          color={dangerColor.value}
          size="sm"
        />
      </>
    );
  }

  return <WizardNavItem {...props} content={validatedLinkName} />;
};

const ClusterWizardStep: React.FC<ClusterWizardStepProps> = ({ cluster, footer, children }) => {
  const { currentStepId, setCurrentStepId } = React.useContext(ClusterWizardContext);

  const nav = (
    <WizardNav>
      <NavItem
        key="cluster-details"
        content={wizardStepNames['cluster-details']}
        isCurrent={currentStepId === 'cluster-details'}
        isValid={() => !cluster || canNextClusterDetails({ cluster })}
        isDisabled={false}
        step={0}
        onNavItemClick={() => setCurrentStepId('cluster-details')}
      />
      <NavItem
        key="baremetal-discovery"
        content={wizardStepNames['baremetal-discovery']}
        isDisabled={!wizardSteps.slice(1).includes(currentStepId)}
        isValid={() => !cluster || canNextBaremetalDiscovery({ cluster })}
        isCurrent={currentStepId === 'baremetal-discovery'}
        step={1}
        onNavItemClick={() => setCurrentStepId('baremetal-discovery')}
      />
      <NavItem
        content={wizardStepNames['networking']}
        step={2}
        isDisabled={!wizardSteps.slice(2).includes(currentStepId)}
        isValid={() => !cluster || canNextNetwork({ cluster })}
        key="networking"
        isCurrent={currentStepId === 'networking'}
        onNavItemClick={() => setCurrentStepId('networking')}
      />
      <NavItem
        content={wizardStepNames['review']}
        step={3}
        isDisabled={!wizardSteps.slice(3).includes(currentStepId)}
        key="review"
        isCurrent={currentStepId === 'review'}
        onNavItemClick={() => setCurrentStepId('review')}
      />
    </WizardNav>
  );

  return (
    <div className={css(styles.wizardOuterWrap, 'cluster-wizard-step')}>
      <div className={css(styles.wizardInnerWrap)}>
        {nav}
        <WizardBody aria-labelledby="step-id" hasNoBodyPadding={false}>
          {children}
        </WizardBody>
      </div>
      {footer && <div className="pf-c-wizard__footer cluster-wizard-step__footer">{footer}</div>}
    </div>
  );
};

export default ClusterWizardStep;