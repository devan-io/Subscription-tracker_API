import { Router } from "express";	

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({title: 'GET all subscriptions'}));
subscriptionRouter.get('/:id', (req, res) => res.send({title: 'Get subscription by ID'}));
subscriptionRouter.post('/', (req, res) => res.send({title: 'Create a subscription'}));
subscriptionRouter.put('/:id', (req, res) => res.send({title: 'Update subscription by ID'}));
subscriptionRouter.delete('/:id', (req, res) => res.send({title: 'Delete subscription by ID'}));

subscriptionRouter.get('/users/:id', (req, res) => res.send({title: 'GET all user subscriptions'}));
subscriptionRouter.get('/:id/cancel', (req, res) => res.send({title: 'Cancel subscriptions'}));
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: 'GET upcoming renewals'}));

export default subscriptionRouter;