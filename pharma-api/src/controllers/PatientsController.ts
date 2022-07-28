import { Request, Response } from 'express';

import Patient from '@models/Patient';

export async function index(req: Request, res: Response): Promise<any> {
  try {
    const page: number = Number(req?.query?.page) ?? Number(1);

    const patients = await Patient.find()
      .limit(50)
      .skip((page - 1) * 50);

    const total = await Patient.countDocuments();

    return res.status(200).json({ total, results: patients });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Ocorreu um erro' });
  }
}

export async function show(req: Request, res: Response) {
  try {
    const patient = await Patient.findOne({ _id: req.params._id });

    return res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Ocorreu um erro' });
  }
}

export async function store(req: Request, res: Response): Promise<any> {
  try {
    const patient = await Patient.create(req.body);

    return res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Ocorreu um erro' });
  }
}

export async function update(req: Request, res: Response): Promise<any> {
  try {
    const patient = await Patient.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      {
        new: true,
      },
    );

    return res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Ocorreu um erro' });
  }
}

export async function destroy(req: Request, res: Response): Promise<any> {
  try {
    await Patient.findOneAndDelete({ _id: req.params._id });

    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Ocorreu um erro' });
  }
}
