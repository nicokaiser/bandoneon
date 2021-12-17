<template>
    <div class="container">
        <footer class="d-print-none border-top pt-4 text-muted small">
            <div class="d-flex justify-content-center">
                <span class="mx-2">
                    <i18n-t keypath="license">
                        <template #name>
                            <a href="https://kaiser.me/" target="_blank"
                                >Nico Kaiser</a
                            >
                        </template>

                        <template #mit>
                            <a
                                v-t="'mit-license'"
                                href="https://github.com/nicokaiser/bandoneon/blob/main/LICENSE"
                                target="_blank"
                            />
                        </template>
                    </i18n-t>
                </span>

                <span class="mx-2">
                    <i18n-t keypath="available">
                        <template #github>
                            <a
                                href="https://github.com/nicokaiser/bandoneon"
                                target="_blank"
                                >GitHub</a
                            >
                        </template>
                    </i18n-t>
                </span>
            </div>
        </footer>
    </div>
</template>

<style scoped>
footer a {
    color: inherit;
}
</style>
