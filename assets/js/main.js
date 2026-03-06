function setupTheme() {
	const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
	const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')
	const themeToggleBtn = document.getElementById('theme-toggle')
	if (!themeToggleDarkIcon || !themeToggleLightIcon || !themeToggleBtn) return

	function setThemeAndSync(isDark) {
		document.documentElement.classList.toggle('dark', isDark)
		localStorage.setItem('color-theme', isDark ? 'dark' : 'light')
		themeToggleDarkIcon.classList.toggle('hidden', isDark)
		themeToggleLightIcon.classList.toggle('hidden', !isDark)
	}

	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
	const storedTheme = localStorage.getItem('color-theme')
	const systemDark = prefersDark.matches

	if (storedTheme) {
		setThemeAndSync(storedTheme === 'dark')
	} else {
		setThemeAndSync(systemDark)
	}

	prefersDark.addEventListener('change', e => {
		setThemeAndSync(e.matches)
	})

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
	if (!tocToggle || !tocContent || !minusIcon || !plusIcon) return

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

function setupArticleAsideTabs() {
	const articleAside = document.getElementById('article-aside')
	if (!articleAside) return

	const tabButtons = articleAside.querySelectorAll('.tab-button')
	const tabContents = articleAside.querySelectorAll('.tab-content')
	const tabSelect = articleAside.querySelector('select#Tab')

	function switchTab(tabId) {
		tabContents.forEach(content => {
			content.classList.add('hidden')
		})

		const selectedContent = articleAside.querySelector(`#${tabId}`)
		if (selectedContent) {
			selectedContent.classList.remove('hidden')
		}

		tabButtons.forEach(button => {
			const isSelected = button.dataset.tab === tabId
			button.setAttribute('aria-selected', isSelected)
			button.classList.remove('fluidity-tab-active', 'fluidity-tab-inactive')
			button.classList.add(isSelected ? 'fluidity-tab-active' : 'fluidity-tab-inactive')
		})

		if (tabSelect) {
			tabSelect.value = tabId.charAt(0).toUpperCase() + tabId.slice(1)
		}
	}

	tabButtons.forEach(button => {
		button.addEventListener('click', e => {
			e.preventDefault()
			switchTab(button.dataset.tab)
		})
	})

	if (tabSelect) {
		tabSelect.addEventListener('change', e => {
			switchTab(e.target.value.toLowerCase())
		})
	}

	const initialTab = tabButtons[0]?.dataset.tab
	if (initialTab) {
		switchTab(initialTab)
	}
}

function setupArticleSidebar() {
	const toggleButton = document.getElementById('toggle-sidebar')
	const sidebar = document.getElementById('sidebar')
	const mainContent = document.getElementById('main-content')
	if (!toggleButton || !sidebar || !mainContent) return

	const label = toggleButton.querySelector('span:last-child')
	const hideLabel = toggleButton.dataset.hideLabel || 'Hide'
	const showLabel = toggleButton.dataset.showLabel || 'Show'
	const grid = mainContent.parentNode

	toggleButton.addEventListener('click', () => {
		const isHidden = sidebar.classList.toggle('hidden')
		grid.classList.toggle('lg:grid-cols-3', !isHidden)
		toggleButton.setAttribute('aria-expanded', String(!isHidden))
		if (label) {
			label.textContent = isHidden ? showLabel : hideLabel
		}
	})
}

function setupMobileMenu() {
	const button = document.getElementById('mobile-menu-button')
	const menu = document.getElementById('mobile-menu')
	if (!button || !menu) return

	button.setAttribute('aria-controls', 'mobile-menu')
	let isOpen = false

	function showMenu() {
		menu.classList.remove('fluidity-mobile-menu-closed')
		menu.classList.add('fluidity-mobile-menu-open')
		menu.setAttribute('aria-hidden', 'false')
		menu.removeAttribute('inert')
		button.setAttribute('aria-expanded', 'true')
		isOpen = true
	}

	function hideMenu() {
		menu.classList.remove('fluidity-mobile-menu-open')
		menu.classList.add('fluidity-mobile-menu-closed')
		menu.setAttribute('aria-hidden', 'true')
		menu.setAttribute('inert', '')
		button.setAttribute('aria-expanded', 'false')
		isOpen = false
	}

	hideMenu()

	button.addEventListener('click', e => {
		e.stopPropagation()
		if (isOpen) {
			hideMenu()
		} else {
			showMenu()
		}
	})

	document.addEventListener('click', event => {
		if (isOpen && !menu.contains(event.target) && !button.contains(event.target)) {
			hideMenu()
		}
	})

	document.addEventListener('keydown', event => {
		if (event.key === 'Escape' && isOpen) {
			hideMenu()
		}
	})
}

function init() {
	setupTheme()
	setupToc()
	setupArticleSidebar()
	setupArticleAsideTabs()
	setupMobileMenu()
}

document.addEventListener('DOMContentLoaded', init)
