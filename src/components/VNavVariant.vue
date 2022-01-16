<template>
    <div class="d-print-none container mb-4">
        <div class="row">
            <div class="col-12 col-sm-6 text-center text-nowrap mb-2">
                <span
                    :class="[
                        'label text-end pe-2',
                        !sideChecked ? 'fw-bold' : 'text-muted',
                    ]"
                    @click.prevent="setSideChecked(!sideChecked)"
                >
                    {{ t('left') }}
                </span>

                <div class="form-check-inline form-switch mx-0">
                    <input
                        :checked="sideChecked"
                        class="form-check-input"
                        type="checkbox"
                        @change="setSideChecked($event.target.checked)"
                    />
                </div>

                <span
                    :class="[
                        'label text-start ps-2',
                        sideChecked ? 'fw-bold' : 'text-muted',
                    ]"
                    @click.prevent="setSideChecked(!sideChecked)"
                >
                    {{ t('right') }}
                </span>
            </div>

            <div class="col-12 col-sm-6 text-center text-nowrap mb-2">
                <span
                    :class="[
                        'label text-end pe-2',
                        !directionChecked ? 'fw-bold' : 'text-muted',
                    ]"
                    @click.prevent="setDirectionChecked(!directionChecked)"
                >
                    {{ t('close') }}
                </span>

                <div class="form-check-inline form-switch mx-0">
                    <input
                        :checked="directionChecked"
                        class="form-check-input"
                        type="checkbox"
                        @change="setDirectionChecked($event.target.checked)"
                    />
                </div>

                <span
                    :class="[
                        'label text-start ps-2',
                        directionChecked ? 'fw-bold' : 'text-muted',
                    ]"
                    @click.prevent="setDirectionChecked(!directionChecked)"
                >
                    {{ t('open') }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const store = useStore();
const { t } = useI18n();

const sideChecked = computed(() => {
    return store.state.variant.split('-')[0] === 'right';
});

const setSideChecked = (checked) => {
    const variant = `${checked ? 'right' : 'left'}-${
        store.state.variant.split('-')[1]
    }`;
    store.commit('setVariant', variant);
};

const directionChecked = computed(() => {
    return store.state.variant.split('-')[1] === 'open';
});

const setDirectionChecked = (checked) => {
    const variant = `${store.state.variant.split('-')[0]}-${
        checked ? 'open' : 'close'
    }`;
    store.commit('setVariant', variant);
};
</script>

<style lang="scss" scoped>
$primary: #6c757d;

.label {
    width: 6em;
    display: inline-block;
    line-height: 2em;
    cursor: default;
    vertical-align: top;
    user-select: none;
}

.form-switch {
    display: inline-block;

    .form-check-input {
        width: 4em;
        height: 2em;
        margin-top: 0;

        &,
        &:checked,
        &:focus {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%236c757d'/%3e%3c/svg%3e");
        }

        &:focus {
            box-shadow: 0 0 0 0.25rem rgb(108 117 125 / 50%);
        }

        &:active {
            filter: none;
        }

        background-position: left center;
        border-color: $primary;
    }

    .form-check-input:checked {
        border-color: $primary;
        background-color: transparent;
    }
}
</style>
