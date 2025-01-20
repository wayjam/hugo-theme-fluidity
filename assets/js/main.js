function setupTheme() {
	const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
	const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')
	const themeToggleBtn = document.getElementById('theme-toggle')

	// Set theme and sync with system
	function setThemeAndSync(isDark) {
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
		/*
		hidden 
		*/
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
		// Hide all tab contents
		tabContents.forEach(content => {
			content.classList.add('hidden')
		})

		// Show selected tab content
		const selectedContent = articleAside.querySelector(`#${tabId}`)
		if (selectedContent) {
			selectedContent.classList.remove('hidden')
		}

		// Update tab button states
		tabButtons.forEach(button => {
			const isSelected = button.dataset.tab === tabId
			button.setAttribute('aria-selected', isSelected)

			// Remove all state classes first
			button.classList.remove(
				'fluidity-tab-active',
				'fluidity-tab-inactive',
			)

			// Apply active or inactive states
			if (isSelected) {
				button.classList.add('fluidity-tab-active')
			} else {
				button.classList.add('fluidity-tab-inactive')
			}
		})

		// Update mobile select if it exists
		if (tabSelect) {
			tabSelect.value = tabId.charAt(0).toUpperCase() + tabId.slice(1)
		}
	}

	// Handle tab button clicks
	tabButtons.forEach(button => {
		button.addEventListener('click', e => {
			e.preventDefault()
			switchTab(button.dataset.tab)
		})
	})

	// Handle mobile select changes
	if (tabSelect) {
		tabSelect.addEventListener('change', e => {
			switchTab(e.target.value.toLowerCase())
		})
	}

	// Show initial tab
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

	toggleButton.addEventListener('click', () => {
		sidebar.remove()
		mainContent.parentNode.classList.remove('lg:grid-cols-3')
	})
}

function setupMobileMenu() {
	const button = document.getElementById('mobile-menu-button')
	const menu = document.getElementById('mobile-menu')
	
	if (!button || !menu) return
	
	let isOpen = false

	function showMenu() {
		menu.classList.remove('fluidity-mobile-menu-closed')
		menu.classList.add('fluidity-mobile-menu-open')
		menu.setAttribute('aria-hidden', 'false')
		button.setAttribute('aria-expanded', 'true')
		isOpen = true
	}

	function hideMenu() {
		menu.classList.remove('fluidity-mobile-menu-open')
		menu.classList.add('fluidity-mobile-menu-closed')
		menu.setAttribute('aria-hidden', 'true')
		button.setAttribute('aria-expanded', 'false')
		isOpen = false
	}

	// Toggle menu on button click
	button.addEventListener('click', (e) => {
		e.stopPropagation()
		if (isOpen) {
			hideMenu()
		} else {
			showMenu()
		}
	})

	// Close menu when clicking outside
	document.addEventListener('click', (event) => {
		if (isOpen && !menu.contains(event.target) && !button.contains(event.target)) {
			hideMenu()
		}
	})

	// Close menu on ESC key
	document.addEventListener('keydown', (event) => {
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

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', init)
