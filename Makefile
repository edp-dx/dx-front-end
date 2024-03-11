CURRENT_DIR=$(shell pwd)
BUILD_DIR=${CURRENT_DIR}/build
BIN_DIR=${CURRENT_DIR}/bin
OS?=linux

HELMDOCS = ${BIN_DIR}/helm-docs
GITCHGLOG = ${BIN_DIR}/git-chglog

.DEFAULT_GOAL:=help
# set default shell
SHELL=/bin/bash -o pipefail -o errexit
help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: clean-all
clean-all:  ## Clean all
	$(call clean_package,shared-react-components)
	$(call clean_package,learning-center)
	$(call clean_package,idp)
	$(call clean_package,container)
	$(call clean_package,dashboard)
	$(call clean_package,configurations)
	rm -rf ${BUILD_DIR}

.PHONY: build-all
build-all:  ## Build all packages
	mkdir -p ${BUILD_DIR}
	$(call build_package,shared-react-components)
	$(call build_package,learning-center)
	$(call build_package,idp)
	$(call build_package,container)
	$(call build_package,dashboard)
	$(call build_package,configurations)

.PHONY: lint
lint: tsc-check format-check  ## Lint
	$(call lint_package,shared-react-components)
	$(call lint_package,learning-center)
	$(call lint_package,idp)
	$(call lint_package,container)
	$(call lint_package,dashboard)
	$(call lint_package,configurations)

.PHONY: tsc-check
tsc-check:  ## Lint
	$(call tsc_check_package,shared-react-components)
	$(call tsc_check_package,learning-center)
	$(call tsc_check_package,idp)
	$(call tsc_check_package,container)
	$(call tsc_check_package,dashboard)
	$(call tsc_check_package,configurations)

.PHONY: format-check
format-check:  ## Lint
	$(call format_check_package,shared-react-components)
	$(call format_check_package,learning-center)
	$(call format_check_package,idp)
	$(call format_check_package,container)
	$(call format_check_package,dashboard)
	$(call format_check_package,configurations)

# Usage:
# (call build_package,package_path)
define build_package
cd packages/$1 && npm install && npm run build
$(eval bld_path := $(if $(filter $(1),container), ${BUILD_DIR}, ${BUILD_DIR}/$1))
mkdir -p ${bld_path}
cp -R packages/$1/dist/* ${bld_path}
endef

# Usage:
# (call lint_package,package_path)
define lint_package
cd packages/$1 && npm run lint
endef

# Usage:
# (call tsc_check_package,package_path)
define tsc_check_package
cd packages/$1 && npm run tsc:check
endef

# Usage:
# (call format_check_package,package_path)
define format_check_package
cd packages/$1 && npm run format:check
endef

# Usage:
# (call clean_package,package_path)
define clean_package
rm -rf packages/$1/dist $1/node_modules
endef

# use https://github.com/git-chglog/git-chglog/
.PHONY: changelog
changelog: $(GITCHGLOG)	## generate changelog
ifneq (${NEXT_RELEASE_TAG},)
	$(GITCHGLOG) --next-tag v${NEXT_RELEASE_TAG} -o CHANGELOG.md v0.1.0..
else
	$(GITCHGLOG) -o CHANGELOG.md v0.1.0..
endif

.PHONY: validate-docs
validate-docs: helm-docs  ## Validate helm docs
	@git diff -s --exit-code deploy-templates/README.md || (echo "Run 'make helm-docs' to address the issue." && git diff && exit 1)

.PHONY: helm-docs
helm-docs: $(HELMDOCS) ## Generate helm docs
	$(HELMDOCS)

$(GITCHGLOG): ## Download git-chglog locally if necessary.
	$(call go-get-tool,$(GITCHGLOG),github.com/git-chglog/git-chglog/cmd/git-chglog,v0.15.1)

$(HELMDOCS):
	@mkdir -p $@
	wget https://github.com/norwoodj/helm-docs/releases/download/v1.11.0/helm-docs_1.11.0_${OS}_x86_64.tar.gz -O $@.tar.gz
	tar xf $@.tar.gz -C ${BIN_DIR}

# go-get-tool will 'go install' any package $2 and install it to $1.
PROJECT_DIR := $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))
define go-get-tool
@[ -f $(1) ] || { \
set -e ;\
TMP_DIR=$$(mktemp -d) ;\
cd $$TMP_DIR ;\
go mod init tmp ;\
echo "Downloading $(2)" ;\
go get -d $(2)@$(3) ;\
GOBIN=$(PROJECT_DIR)/bin go install $(2) ;\
rm -rf $$TMP_DIR ;\
}
endef
