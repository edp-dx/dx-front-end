import AwsIcon from 'public/assets/amazon.svg';
import AtlasIcon from 'public/assets/atlas.svg';
import AzureIcon from 'public/assets/azure.svg';
import GCPIcon from 'public/assets/gcp.svg';
import KubernetesIcon from 'public/assets/kubernetes.svg';
import OtherIcon from 'public/assets/other.svg';

export const PLATFORM_ICON_MAPPING = {
	aws: AwsIcon,
	kubernetes: KubernetesIcon,
	azure: AzureIcon,
	atlas: AtlasIcon,
	gcp: GCPIcon,
	other: OtherIcon,
} as const;
