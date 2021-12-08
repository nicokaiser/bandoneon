<template>
    <footer class="d-print-none">
        <div class="container my-4">
            <hr class="my-4" />

            <div class="d-flex justify-content-between">
                <span>
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

                <span>
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
        </div>
    </footer>
</template>

<style scoped>
footer {
    color: #aaa;
    font-size: 80%;
}

footer a {
    color: #aaa;
}
</style>
