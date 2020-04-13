import React, { useEffect, useState } from 'react'
import { graphql, buildSchema } from 'graphql'
import { request } from 'graphql-request'
import { Country } from 'components/country'

export const Selected = ({ selectedCountry }) => {
    // const query = `{
    //     Movie(title: "Inception") {
    //       releaseDate
    //       actors {
    //         name
    //       }
    //     }
    //   }`

    return (
        <div>
            <Country country={selectedCountry} />
        </div>
    )
}
