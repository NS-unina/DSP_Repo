<?php

/**
 * The generic utility popup modal
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

?>
<div
    x-cloak
    x-title="Modal"
    x-data="{
        usedKeyboard: false,
        resetState() {
            this.headline = '<?php \esc_html_e('Action', 'metagallery'); ?>'
            this.content = ''
            this.type = 'danger'
            this.action = () => {}
            this.actionLabel = '<?php \esc_html_e('Ok', 'metagallery'); ?>'
            this.secondaryAction = () => {}
            this.secondaryActionLabel = '<?php \esc_html_e('Cancel', 'metagallery'); ?>'
            this.source = {}
        },
        init() {
            this.resetState()
            this.$watch(
                'content',
                value => document.body.classList[this.content.length ? 'add' : 'remove']('h-screen', 'overflow-hidden')
            )
        },
        updateData(event) {
            Object.entries(event.detail).forEach(item => {
                this[item[0]] = item[1]
            })
        }
    }"
    x-init="init()"
    @click="resetState()"
    @keydown.escape.window="resetState()"
    @keydown.window.tab="usedKeyboard = true"
    :class="{
        'hidden': !content.length,
        'focus:outline-none': !usedKeyboard
    }"
    tabindex="-1"
    class="metagallery-allowed overflow-scroll fixed inset-0 p-6 md:p-32 bg-opacity-60 bg-nord3 z-max  flex items-center justify-center"
    @close-modal.window="content = ''"
    @open-modal.window="updateData($event);setTimeout(() => $refs.actionButton.focus(), 10)">
    <article
        x-show.transition.duration.500="content.length"
        :aria-hidden="content.length.toString()"
        @click.stop
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 focus:outline-none"
        :class="{ 'focus:ring': usedKeyboard }"
        role="dialog"
        aria-modal="true"
        tabindex="0"
        aria-labelledby="modal-headline">
        <?php
        // phpcs:ignore Squiz.Commenting.BlockComment.NoNewLine
        /* <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
            <button
                type="button"
                @click="resetState()"
                class="bg-white rounded-md text-nord3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="sr-only"><?php \esc_html_e('Close', 'metagallery'); ?></span>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        */

        ?>
        <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-nord6 text-nord9 sm:mx-0 sm:h-10 sm:w-10">
                <svg x-show="type === 'info'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg x-show="type === 'danger'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                    class="text-lg leading-6 font-medium text-gray-900"
                    x-text="headline"
                    id="modal-headline">
                </h3>
                <div class="mt-2" x-html="content"></div>
            </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
                type="button"
                x-ref="actionButton"
                @click="action.call(source)"
                x-text="actionLabel"
                :class="{
                    'bg-nord11 focus:ring-nord11': type === 'danger',
                    'bg-nord9 focus:ring-nord9': type === 'info',
                }"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
            </button>
            <button
                type="button"
                x-show="secondaryActionLabel"
                @click="resetState();secondaryAction.call(source)"
                x-text="secondaryActionLabel"
                :class="{
                    'inline-flex': secondaryActionLabel,
                }"
                class="mt-3 w-full justify-center rounded-md border border-nord3 shadow-sm px-4 py-2 bg-white text-base font-medium text-nord3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nord10 sm:mt-0 sm:w-auto sm:text-sm">
            </button>
        </div>
    </article>
</div>
