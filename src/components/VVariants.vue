<template>
    <div class="d-print-none container mb-5">
        <div class="row">
            <div class="col-12 col-sm-6 text-center text-nowrap mb-2">
                <span
                    v-t="'left'"
                    class="label text-end"
                    @click.prevent="toggleSide"
                />
                <div class="form-check-inline form-switch mx-3">
                    <input
                        v-model="sideChecked"
                        class="form-check-input"
                        type="checkbox"
                    />
                </div>
                <span
                    v-t="'right'"
                    class="label text-start"
                    @click.prevent="toggleSide"
                />
            </div>

            <div class="col-12 col-sm-6 text-center text-nowrap mb-2">
                <span
                    v-t="'close'"
                    class="label text-end"
                    @click.prevent="toggleDirection"
                />
                <div class="form-check-inline form-switch mx-3">
                    <input
                        v-model="directionChecked"
                        class="form-check-input"
                        type="checkbox"
                    />
                </div>
                <span
                    v-t="'open'"
                    class="label text-start"
                    @click.prevent="toggleDirection"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    data: () => ({
        sideChecked: true,
        directionChecked: true,
    }),

    computed: {
        direction() {
            return this.variant.split('-')[1] || 'open';
        },

        side() {
            return this.variant.split('-')[0] || 'right';
        },

        ...mapState(['variant']),
    },

    watch: {
        directionChecked(open) {
            this.setVariant(`${this.side}-${open ? 'open' : 'close'}`);
        },

        sideChecked(right) {
            this.setVariant(`${right ? 'right' : 'left'}-${this.direction}`);
        },

        direction() {
            this.directionChecked = this.direction === 'open';
        },

        side() {
            this.sideChecked = this.side == 'right';
        },
    },

    mounted() {
        this.sideChecked = this.side == 'right';
        this.directionChecked = this.direction === 'open';
    },

    methods: {
        toggleDirection() {
            this.directionChecked = this.direction === 'close';
        },

        toggleSide() {
            this.sideChecked = this.side === 'left';
        },

        ...mapMutations(['setVariant']),
    },
};
</script>

<style lang="scss" scoped>
$primary: #6c757d; //  #0d6efd;

.col {
    border: 1px solid green;
}
.label {
    width: 4em;
    display: inline-block;
    line-height: 2em;
    cursor: default;
    vertical-align: bottom;
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

.nav {
    border-bottom: 1px solid #dee2e6;
}

.nav .nav-link {
    border-bottom: 1px solid transparent;
    margin-bottom: -1px;
}

.btn-outline-secondary:not(.active):hover {
    background-color: transparent;
    color: #6c757d;
}

button:focus {
    box-shadow: none !important;
}
</style>
