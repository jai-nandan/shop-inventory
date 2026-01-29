function addCompany() {
    if(!cName.value || !cLogo.files[0]) { alert('Name & logo required'); return; }
    const r = new FileReader();
    r.onload = () => {
        let companies = getData('companies');
        companies.push({
            id: Date.now(), // THIS LINE IS REQUIRED FOR EDIT/DELETE
            name: cName.value,
            logo: r.result
        });
        saveData('companies', companies);
        renderCompanies();
        cName.value = ''; // Clear input
    };
    r.readAsDataURL(cLogo.files[0]);
}