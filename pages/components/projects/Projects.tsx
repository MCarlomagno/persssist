
import { NextPage } from 'next'
import { Card } from '../shared/card'


export const Projects: NextPage = () => {

    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mx-3 md:m-auto max-w-5xl">
                <Card title={'Test'} size={'2 Mb'}></Card>
                <Card title={'Test'} size={'2 Mb'}></Card>
                <Card title={'Test'} size={'2 Mb'}></Card>
                <Card title={'Test'} size={'2 Mb'}></Card>
                <Card title={'Test'} size={'2 Mb'}></Card>
                <Card title={'Test'} size={'2 Mb'}></Card>
        </div>
    )
}