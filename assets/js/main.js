import { setTheme } from '@fluentui/web-components'
import { webLightTheme, webDarkTheme } from '@fluentui/tokens'

function setupTheme() {
	const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
	const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')
	const themeToggleBtn = document.getElementById('theme-toggle')

	// Set theme and sync with system
	function setThemeAndSync(isDark) {
		const themeName = isDark ? webDarkTheme : webLightTheme
		// Keep web component theme setting
		setTheme(themeName)
		// Sync with .dark class
		document.documentElement.classList.toggle('dark', isDark)
		// document.documentElement.setAttribute('data-mode', isDark ? 'dark' : 'light');
		// Sync with localStorage
		localStorage.setItem('color-theme', isDark ? 'dark' : 'light')
		// Update icons
		themeToggleDarkIcon.classList.toggle('hidden', isDark)
		themeToggleLightIcon.classList.toggle('hidden', !isDark)
	}

	// Read initial system preference
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

	// Initialize theme based on system preference or stored preference
	const storedTheme = localStorage.getItem('color-theme')
	const systemDark = prefersDark.matches

	if (storedTheme) {
		setThemeAndSync(storedTheme === 'dark')
	} else {
		setThemeAndSync(systemDark)
	}

	// Listen for system theme changes
	prefersDark.addEventListener('change', e => {
		setThemeAndSync(e.matches)
	})

	// Handle manual theme toggle
	themeToggleBtn.addEventListener('click', () => {
		const isDark = document.documentElement.classList.contains('dark')
		setThemeAndSync(!isDark)
	})
}

function setupToc() {
	const toc = document.querySelector('#toc')
	if (!toc) return

	const tocToggle = toc.querySelector('#toc-toggle')
	const tocContent = toc.querySelector('.toc-content')
	const minusIcon = toc.querySelector('.toc-expand')
	const plusIcon = toc.querySelector('.toc-collapse')

	if (tocToggle) {
		tocToggle.addEventListener('click', function () {
			tocContent.classList.toggle('hidden')
			minusIcon.classList.toggle('hidden')
			plusIcon.classList.toggle('hidden')
			localStorage.setItem('tocState', tocContent.classList.contains('hidden') ? 'hidden' : 'visible')
		})

		const savedState = localStorage.getItem('tocState')
		if (savedState === 'hidden') {
			tocContent.classList.add('hidden')
			minusIcon.classList.add('hidden')
			plusIcon.classList.remove('hidden')
		}
	}
}

function init() {
	setupTheme()
	setupToc()
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', init)
