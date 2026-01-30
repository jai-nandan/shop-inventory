let editModeComp = { active: false, id: null };

function addCompany() {
    let companies = getData('companies'); // Get latest
    const nameInput = document.getElementById('cName');
    const branchInput = document.getElementById('cBranch');

    if (!nameInput.value || !branchInput.value) {
        alert("Name and Branch are required");
        return;
    }

    if (editModeComp.active) {
        const index = companies.findIndex(c => c.id === editModeComp.id);
        if (index !== -1) {
            companies[index] = {
                id: editModeComp.id,
                name: nameInput.value,
                branch: branchInput.value
            };
        }
        editModeComp = { active: false, id: null };
        document.querySelector("button[onclick='addCompany()']").innerText = "Add Company";
    } else {
        companies.push({
            id: Date.now(),
            name: nameInput.value,
            branch: branchInput.value
        });
    }

    saveData('companies', companies);
    renderAll();
    nameInput.value = '';
    branchInput.value = '';
}

function prepareCompanyEdit(id) {
    let companies = getData('companies');
    // Ensure we compare numbers
    const comp = companies.find(c => Number(c.id) === Number(id));
    
    if (comp) {
        document.getElementById('cName').value = comp.name;
        document.getElementById('cBranch').value = comp.branch || '';

        editModeComp = { active: true, id: Number(id) };
        
        // Find the button more safely
        const btn = document.querySelector(".form-group button");
        if(btn) btn.innerText = "Update Company";
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
