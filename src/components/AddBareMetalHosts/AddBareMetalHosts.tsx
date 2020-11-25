import {
  ButtonVariant,
  Card,
  CardBody,
  CardTitle,
  Title,
  Toolbar,
  ToolbarContent,
} from '@patternfly/react-core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Cluster, getErrorMessage, handleApiError, installHosts } from '../../api';
import { addAlert } from '../../features/alerts/alertsSlice';
import { updateCluster } from '../../features/clusters/currentClusterSlice';
import { hasKnownHost } from '../hosts/utils';
import { ToolbarButton, ToolbarSecondaryGroup } from '../ui';
import { Alerts } from '../ui/AlertsSection';
import { EventsModalButton } from '../ui/eventsModal';
import BaremetalInventoryAddHosts from './BareMetalInventoryAddHost';

const AddBareMetalHosts: React.FC<{ cluster: Cluster; ocpConsoleUrl?: string }> = ({
  cluster,
  ocpConsoleUrl,
}) => {
  const dispatch = useDispatch();

  const handleHostsInstall = async () => {
    try {
      const { data } = await installHosts(cluster.id);
      dispatch(updateCluster(data));
    } catch (e) {
      handleApiError(e, () =>
        addAlert({
          title: 'Failed to start hosts installation.',
          message: getErrorMessage(e),
        }),
      );
    }
  };

  return (
    <Card>
      <CardTitle>
        <Title headingLevel="h2" size="lg" className="card-title">
          Bare Metal Discovery
        </Title>
      </CardTitle>
      <CardBody>
        <BaremetalInventoryAddHosts cluster={cluster} ocpConsoleUrl={ocpConsoleUrl} />
        <Alerts />
        <Toolbar id="cluster-toolbar">
          <ToolbarContent>
            <ToolbarButton
              variant={ButtonVariant.primary}
              name="install"
              onClick={handleHostsInstall}
              isDisabled={!hasKnownHost(cluster)}
            >
              Install ready hosts
            </ToolbarButton>
            <ToolbarSecondaryGroup>
              <EventsModalButton
                id="cluster-events-button"
                entityKind="cluster"
                cluster={cluster}
                title="Cluster Events"
                variant={ButtonVariant.link}
                style={{ textAlign: 'right' }}
              >
                View Cluster Events
              </EventsModalButton>
            </ToolbarSecondaryGroup>
          </ToolbarContent>
        </Toolbar>
      </CardBody>
    </Card>
  );
};

export default AddBareMetalHosts;
