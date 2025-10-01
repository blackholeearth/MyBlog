// ==UserScript==
// @name         GitHub - Commits Compare - Filter deps"RenovateBot" noise. (with Group Hiding)
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Adds a button to toggle visibility of deps commits and hides empty date groups.
// @author       You
// @match        https://github.com/*/*/commits/*
// @match        https://github.com/*/*/compare/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    let isFilterActive = true;
    let debounceTimer;

    function applyFilter() {
        console.log("github - apply filter STARTED..");

        const commitItems = document.querySelectorAll('li.js-commits-list-item');
        const toggleButton = document.getElementById('toggle-deps-filter-btn');

        // Update the button's appearance
        if (toggleButton) {
            toggleButton.textContent = `Toggle Deps Filter: ${isFilterActive ? 'ON' : 'OFF'}`;
            isFilterActive ? toggleButton.classList.add('Button--primary') : toggleButton.classList.remove('Button--primary');
        }

        // Step 1: Hide or show individual commit items based on the filter state
        commitItems.forEach(item => {
            const commitLink = item.querySelector('p.mb-1 a.markdown-title');
            if (commitLink && commitLink.textContent.toLowerCase().includes('(deps)')) {
                if (isFilterActive) {
                    item.style.setProperty('display', 'none', 'important');
                } else {
                    item.style.removeProperty('display');
                }
            }
        });

        // Step 2: NEW - Update the visibility of the group headers
        updateGroupHeadersVisibility();
    }

    // This is the new function that handles the group headers
    function updateGroupHeadersVisibility() {
        // Find all the date group headers
        const groupHeaders = document.querySelectorAll('div.TimelineItem--condensed');

        groupHeaders.forEach(header => {
            const commitsInGroup = header.querySelectorAll('li.js-commits-list-item');

                    // console.log('commits in group:', commitsInGroup);

            // If there are no commits in this group for some reason, do nothing.
            if (commitsInGroup.length === 0) {
                return;
            }

            const allCommitsInGroupAreHidden = Array.from(commitsInGroup)
                 .every(commit => {
                     //console.log('Checking commit display style:', commit.style.display);

                     // Now, you MUST explicitly return the result of the check
                     return commit.style.display === 'none';
                 });

            // Now, hide or show the header based on the result
            if (allCommitsInGroupAreHidden) {
                header.style.setProperty('display', 'none', 'important');
            } else {
                header.style.removeProperty('display');
            }
        });
    }

    function createToggleButton() {
        if (document.getElementById('toggle-deps-filter-btn')) return;
        const targetContainer = document.getElementById('commits_bucket');
        if (targetContainer) {
            const button = document.createElement('button');
            button.id = 'toggle-deps-filter-btn';
            button.classList.add('Button', 'Button--secondary', 'Button--small', 'mb-3');
            button.addEventListener('click', () => {
                isFilterActive = !isFilterActive;
                applyFilter();
            });
            targetContainer.prepend(button);
        }
    }

    // The debounced MutationObserver remains unchanged. It's crucial for performance.
    const observer = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            createToggleButton();
            applyFilter();
        }, 330);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial run
    setTimeout(() => {
        createToggleButton();
        applyFilter();
    }, 500);

})();
