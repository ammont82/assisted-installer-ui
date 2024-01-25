import React from 'react';
import { useSelector } from 'react-redux';
import { Stack, StackItem } from '@patternfly/react-core';
import { ClusterOperatorProps, ClusterWizardStepHeader } from '../../../common';
import CnvCheckbox from '../clusterConfiguration/operators/CnvCheckbox';
import OdfCheckbox from '../clusterConfiguration/operators/OdfCheckbox';
import LvmCheckbox from '../clusterConfiguration/operators/LvmCheckbox';
import MceCheckbox from '../clusterConfiguration/operators/MceCheckbox';
import { selectIsCurrentClusterSNO } from '../../store/slices/current-cluster/selectors';
import { isOCPVersionEqualsOrMajor } from '../utils';

export const OperatorsStep = (props: ClusterOperatorProps) => {
  const isSNO = useSelector(selectIsCurrentClusterSNO);
  const isLVMSMultiNodeEnabled = isOCPVersionEqualsOrMajor(props.openshiftVersion || '', '4.15');
  return (
    <Stack hasGutter data-testid={'operators-form'}>
      <StackItem>
        <ClusterWizardStepHeader>Operators</ClusterWizardStepHeader>
      </StackItem>
      <StackItem>
        <CnvCheckbox {...props} />
      </StackItem>
      <StackItem>
        <MceCheckbox />
      </StackItem>
      <StackItem>
        {isSNO || isLVMSMultiNodeEnabled ? <LvmCheckbox {...props} /> : <OdfCheckbox />}
      </StackItem>
    </Stack>
  );
};
