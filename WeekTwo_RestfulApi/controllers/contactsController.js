const { ContactModel, Pager, sortContacts, filterContacts } = require('../model/Contacts');

function sendError(res, e) {
	res.status(e.statusCode || 500).json({ message: e.message });
}

exports.getAllContacts = (req, res) => {
	try {
		const { sort, direction, page, limit } = req.query;
		const filterBy = req.get('X-Filter-By');
		const filterOperator = req.get('X-Filter-Operator');
		const filterValue = req.get('X-Filter-Value');

		let data = [...ContactModel.index()];

		if (filterBy) {
			data = filterContacts(filterBy, filterOperator, filterValue, data);
		}

		if (sort) {
			data = sortContacts(data, sort, direction);
		}

		// Filtered results are returned in full; only the default listing is paginated.
		if (!filterBy) {
			const pager = new Pager(data, page, limit);
			data = pager.results();
		}

		res.json(data);
	} catch (e) {
		sendError(res, e);
	}
};

exports.getContactById = (req, res) => {
	try {
		res.json(ContactModel.show(req.params.id));
	} catch (e) {
		sendError(res, e);
	}
};

exports.createContact = (req, res) => {
	try {
		const contact = ContactModel.create(req.body);
		res.status(303).location(`/v1/contacts/${contact.id}`).end();
	} catch (e) {
		sendError(res, e);
	}
};

exports.updateContact = (req, res) => {
	try {
		const contact = ContactModel.update(req.params.id, req.body);
		res.json(contact);
	} catch (e) {
		sendError(res, e);
	}
};

exports.deleteContact = (req, res) => {
	try {
		ContactModel.remove(req.params.id);
		res.status(204).end();
	} catch (e) {
		sendError(res, e);
	}
};
