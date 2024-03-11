import CdkIcon from 'public/assets/cdk.svg';
import CrossplaneIcon from 'public/assets/crossplane.svg';
import GradleIcon from 'public/assets/gradle.svg';
import HelmIcon from 'public/assets/helm.svg';
import MavenIcon from 'public/assets/maven.svg';
import NpmIcon from 'public/assets/npm.svg';
import OtherIcon from 'public/assets/other.svg';
import PythonIcon from 'public/assets/python.svg';
import SamIcon from 'public/assets/sam.svg';
import TerraformIcon from 'public/assets/terraform.svg';

export const BUILD_TOOL_ICON_MAPPING = {
	sam: SamIcon,
	terraform: TerraformIcon,
	maven: MavenIcon,
	npm: NpmIcon,
	helm: HelmIcon,
	cdk: CdkIcon,
	python: PythonIcon,
	gradle: GradleIcon,
	crossplane: CrossplaneIcon,
	other: OtherIcon,
} as const;
