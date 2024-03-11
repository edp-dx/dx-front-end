import HclIcon from 'public/assets/hcl.svg';
import JavaIcon from 'public/assets/java.svg';
import JavaScriptIcon from 'public/assets/javascript.svg';
import OtherIcon from 'public/assets/other.svg';
import PythonIcon from 'public/assets/python.svg';
import YamlIcon from 'public/assets/yaml.svg';

export const LANGUAGE_ICON_MAPPING = {
	python: PythonIcon,
	java: JavaIcon,
	javascript: JavaScriptIcon,
	yaml: YamlIcon,
	hcl: HclIcon,
	other: OtherIcon,
} as const;
