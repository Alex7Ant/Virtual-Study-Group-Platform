// Add this new file for group functionality
document.addEventListener('DOMContentLoaded', function() {
    // Group search functionality
    const searchInput = document.getElementById('searchGroups');
    const filterSelect = document.getElementById('filterTopic');
    const groupsList = document.getElementById('groupsList');

    function filterGroups() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedTopic = filterSelect.value.toLowerCase();
        const groups = groupsList.getElementsByClassName('group-card');

        Array.from(groups).forEach(group => {
            const title = group.querySelector('h3').textContent.toLowerCase();
            const topic = group.querySelector('.topic').textContent.toLowerCase();
            const description = group.querySelector('.description').textContent.toLowerCase();

            const matchesSearch = title.includes(searchTerm) || 
                                description.includes(searchTerm);
            const matchesTopic = !selectedTopic || topic.includes(selectedTopic);

            group.style.display = matchesSearch && matchesTopic ? 'block' : 'none';
        });
    }

    searchInput.addEventListener('input', filterGroups);
    filterSelect.addEventListener('change', filterGroups);
}); 