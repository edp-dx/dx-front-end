import AngularIcon from 'public/assets/angular.svg';
import CdkIcon from 'public/assets/cdk.svg';
import CrossplaneIcon from 'public/assets/crossplane.svg';
import FastapiIcon from 'public/assets/fastapi.svg';
import HelmIcon from 'public/assets/helm.svg';
import MicronautIcon from 'public/assets/micronaut.svg';
import OpenLibertyIcon from 'public/assets/open_liberty.svg';
import OtherIcon from 'public/assets/other.svg';
import ReactIcon from 'public/assets/react.svg';
import SamIcon from 'public/assets/sam.svg';
import SpringbootIcon from 'public/assets/springboot.svg';
import TerraformIcon from 'public/assets/terraform.svg';

export const FRAMEWORK_ICON_MAPPING = {
	sam: SamIcon,
	terraform: TerraformIcon,
	springboot: SpringbootIcon,
	react: ReactIcon,
	helm: HelmIcon,
	fastapi: FastapiIcon,
	cdk: CdkIcon,
	crossplane: CrossplaneIcon,
	angular: AngularIcon,
	micronaut: MicronautIcon,
	openliberty: OpenLibertyIcon,
	other: OtherIcon,
} as const;
