<?php

/**
 * The state controller for the toolbar (3 dots) dropdown
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}
?>

<div
    x-title="Global Editor Settings"
    x-data="{
        fullScreen: JSON.parse(localStorage.getItem('metagallery-fullscreen')),
        theme: JSON.parse(localStorage.getItem('metagallery-theme')),
        bgcolor: JSON.parse(localStorage.getItem('metagallery-theme')),
        editorWidth: JSON.parse(localStorage.getItem('metagallery-editorwidth')) || 1000,
        updateSetting(setting, value) {
            console.log(`MetaGallery Editor: Updating ${setting} to:`, value)
            this[setting] = value
            localStorage.setItem(`metagallery-${setting.toLowerCase()}`, JSON.stringify(value))
            setTimeout(() => {
                window.dispatchEvent(
                    new CustomEvent('reset-layout', {
                        detail: {},
                        bubbles: true,
                    }),
                )
            }, 0)
        }
    }"
    x-id="settings"></div>
