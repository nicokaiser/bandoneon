<template>
    <div class="mb-2 text-center d-print-none">
        <div class="btn-group mx-2">
            <button
                v-for="item in scaleTypes"
                :key="item"
                :class="[
                    'btn btn-outline-secondary my-2',
                    item === scaleType ? 'active' : null,
                ]"
                @click.stop="setScaleType(item)"
            >
                {{ t(item) }}
            </button>
        </div>

        <div class="btn-group mx-2">
            <button
                v-for="item in chordTypes"
                :key="item"
                :class="[
                    'btn btn-outline-secondary my-2',
                    item === chordType ? 'active' : null,
                ]"
                @click.stop="setChordType(item)"
            >
                {{ item }}
            </button>
        </div>

        <div class="btn-group mx-2">
            <button
                class="btn btn-outline-secondary my-2"
                style="width: 2em"
                @click.stop="toggleEnharmonics()"
            >
                {{ showEnharmonics ? '♯' : '♭' }}
            </button>

            <button
                :class="[
                    'btn btn-outline-secondary my-2',
                    showColors ? 'active' : null,
                ]"
                @click.stop="toggleColors()"
            >
                <ColorsIcon />
            </button>

            <button
                class="btn btn-outline-secondary my-2"
                :title="t('saveImage')"
                @click.stop="downloadImage()"
            >
                <DownloadIcon />
            </button>

            <button
                class="btn btn-outline-secondary my-2"
                :title="t('saveVoicing')"
                @click.stop="saveUserChord()"
            >
                <PinIcon />
            </button>

            <button
                class="btn btn-outline-secondary my-2"
                :title="t('resetVoicing')"
                @click.stop="resetUserChord()"
            >
                <ResetIcon />
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '@/stores/main';
import { useSettingsStore } from '../stores/settings';
import ResetIcon from '@/components/icon/ResetIcon.vue';
import DownloadIcon from '@/components/icon/DownloadIcon.vue';
import ColorsIcon from '@/components/icon/ColorsIcon.vue';
import PinIcon from '@/components/icon/PinIcon.vue';

const props = defineProps({
    keyboardRef: {
        type: Object,
        default: null,
    },
});

const store = useStore();
const settings = useSettingsStore();

const { t } = useI18n();

const scaleTypes = computed(() => store.availableScaleTypes);
const scaleType = computed(() => store.scaleType);
const setScaleType = (value) => store.setScaleType(value);

const chordTypes = computed(() => store.availableChordTypes);
const chordType = computed(() => store.chordType);
const setChordType = (value) => store.setChordType(value);

const showColors = computed(() => store.showColors);
const toggleColors = () => (store.showColors = !store.showColors);
const showEnharmonics = computed(() => store.showEnharmonics);
const toggleEnharmonics = () =>
    (store.showEnharmonics = !store.showEnharmonics);

const downloadImage = () => props.keyboardRef.downloadImage();
const saveUserChord = () => {
    if (props.keyboardRef.modified) {
        const selectedNotes = props.keyboardRef.selectedNotes;
        settings.saveUserChord(store.side, store.chordName, selectedNotes);
    }
};

const resetUserChord = () => {
    props.keyboardRef.resetSelected();
    settings.resetUserChord(store.side, store.chordName);
};
</script>
