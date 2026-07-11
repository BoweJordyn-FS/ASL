const {
	ContactModel,
	Pager,
	sortContacts,
	filterContacts,
} = require('../model/Contacts');

const maxLimit = 20;

exports.getAllContacts = (req, res) => {
	try {
		const { sort, direction, page, limit } = req.query;
		const filterBy = req.get('X-Filter-By');
		const filterOperator = req.get('X-Filter-Operator');
		const filterValue = req.get('X-Filter-Value');

		if (direction && !['asc', 'desc'].includes(direction)) {
			return res.status(400).json({
				message: `"${direction}" is not a valid sort direction. Use "asc" or "desc".`,
			});
		}

		if (limit !== undefined && Number(limit) > maxLimit) {
			return res
				.status(400)
				.json({ message: `The limit per page cannot exceed ${maxLimit}.` });
		}

		let data = [...ContactModel.index()];

		//  Filtering -> Sorting -> Pagination
		if (filterBy) {
			data = filterContacts(filterBy, filterOperator, filterValue, data);
		}

		if (sort) {
			data = sortContacts(data, sort, direction);
		}

		const pager = new Pager(data, page, limit);

		res.set('X-Page-Total', pager.total);
		res.set('X-Page-Next', pager.next());
		res.set('X-Page-Prev', pager.prev());
		res.set('X-Results-Total', pager.total);
		res.json(pager.results());
	} catch (e) {
		switch (e.name) {
			case 'InvalidEnumError':
			case 'InvalidContactError':
			case 'InvalidContactSchemaError':
			case 'InvalidOperatorError':
				return res.status(400).json({ message: e.message });
			case 'PagerOutOfRangeError':
				return res.status(416).json({ message: e.message });
			case 'PagerLimitExceededError':
				return res.status(400).json({ message: e.message });
			default:
				return res.status(500).json({ message: e.message });
		}
	}
};

exports.getContactById = (req, res) => {
	try {
		res.json(ContactModel.show(req.params.id));
	} catch (e) {
		switch (e.name) {
			case 'InvalidContactError':
				return res.status(400).json({
					message: e.message,
				});

			case 'ContactNotFoundError':
				return res.status(404).json({
					message: e.message,
				});

			default:
				return res.status(500).json({
					message: e.message,
				});
		}
	}
};

exports.createContact = (req, res) => {
	try {
		const contact = ContactModel.create(req.body);
		res.status(303).location(`/v1/contacts/${contact.id}`).end();
	} catch (e) {
		switch (e.name) {
			case 'InvalidContactError':
			case 'InvalidContactFieldError':
			case 'InvalidContactSchemaError':
			case 'DuplicateContactResourceError':
				return res.status(400).json({
					message: e.message,
				});
			default:
				return res.status(500).json({
					message: e.message,
				});
		}
	}
};

exports.updateContact = (req, res) => {
	try {
		const contact = ContactModel.update(req.params.id, req.body);
		res.json(contact);
	} catch (e) {
		switch (e.name) {
			case 'InvalidContactError':
			case 'InvalidContactFieldError':
			case 'InvalidContactSchemaError':
				return res.status(400).json({
					message: e.message,
				});

			case 'ContactNotFoundError':
				return res.status(404).json({
					message: e.message,
				});

			default:
				return res.status(500).json({
					message: e.message,
				});
		}
	}
};

exports.deleteContact = (req, res) => {
	try {
		ContactModel.remove(req.params.id);
		res.status(202).location('/v1/contacts').end();
	} catch (e) {
		switch (e.name) {
			case 'InvalidContactError':
				return res.status(400).json({
					message: e.message,
				});

			case 'ContactNotFoundError':
				return res.status(404).json({
					message: e.message,
				});

			default:
				return res.status(500).json({
					message: e.message,
				});
		}
	}
};
